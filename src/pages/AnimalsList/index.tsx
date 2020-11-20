import React, { useCallback, useState, useEffect, useRef } from 'react';

import { useNavigation } from '@react-navigation/native';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Feather';
import Icon5 from 'react-native-vector-icons/FontAwesome5';
import { FormHandles } from '@unform/core';
import DatePicker from '../../components/DatePicker';
import Dropdown from '../../components/Dropdown';
import Input from '../../components/Input';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  BackButton,
  HeaderTitle,
  ProfileButton,
  UserAvatar,
  Content,
  RegisterAnimalButtonContainer,
  Form,
  SearchButtonContainer,
  AnimalsContainer,
  Animal,
  AnimalInfo,
  AnimalId,
  AnimalRace,
} from './styles';
import api from '../../services/api';
import Button from '../../components/Button';

export interface IAnimals {
  id: string;
  nome_ou_brinco: string;
  raca: string;
  sexo: string;
  nascimento: string;
}

interface ISearchFormData {
  nome_ou_brinco?: string;
  peso?: number;
  nascimento?: Date;
  raca?: string;
  sexo?: string;
  cidade?: string;
  estado?: string;
}

const AnimalsList: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const [reloadPage, setReloadPage] = useState(false);
  const [animals, setAnimals] = useState<IAnimals[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const { user } = useAuth();
  const { goBack, navigate, addListener } = useNavigation();

  useEffect(() => {
    addListener('focus', _ => {
      setReloadPage(state => !state);
    });
  }, [addListener]);

  useEffect(() => {
    api.get<IAnimals[]>('animals').then(response => {
      setAnimals(response.data);
    });
  }, [reloadPage]);

  const handleShowForm = useCallback(() => {
    setShowForm(state => !state);
  }, []);

  const handleNavigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const handleNavigateToAnimal = useCallback(
    (animal_id: string, animal_birth_date: string) => {
      navigate('AnimalDetails', { animal_id, animal_birth_date });
    },
    [navigate],
  );

  const handleNavigateAnimalRegister = useCallback(() => {
    navigate('CadastroAnimal');
  }, [navigate]);

  const handleSearch = useCallback(async (data: ISearchFormData) => {
    try {
      setIsLoading(true);
      formRef.current?.setErrors({});

      const response = await api.post('search-animals', data);

      setAnimals(response.data);

      setIsLoading(false);
    } catch (err) {
      Alert.alert(
        'Erro na busca',
        'Ocorreu um erro ao tentar buscar os animais, tente novamente mais tarde',
      );
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <Container>
          <Header>
            <HeaderTitle>Gado cadastrado</HeaderTitle>

            <ProfileButton onPress={handleNavigateToProfile}>
              {user.avatar_url ? (
                <UserAvatar source={{ uri: user.avatar_url }} />
              ) : (
                <Icon5 name="user-circle" size={56} />
              )}
            </ProfileButton>
          </Header>
          <ScrollView>
            <Content>
              <RegisterAnimalButtonContainer>
                <Button onPress={handleNavigateAnimalRegister}>
                  Cadastrar novo bovino
                </Button>
              </RegisterAnimalButtonContainer>
              {showForm ? (
                <Form onSubmit={handleSearch} ref={formRef}>
                  <Input
                    style={{ width: '100%' }}
                    placeholder="Nome/Brinco"
                    name="nome_ou_brinco"
                  />

                  <Dropdown
                    name="raca"
                    title="Raça"
                    pickerItems={[
                      { label: 'Selecione uma raça', value: '' },
                      { label: 'Girolando', value: 'Girolando' },
                      { label: 'Guzerá', value: 'Guzerá' },
                      { label: 'Holandês', value: 'Holandês' },
                      { label: 'Nelore', value: 'Nelore' },
                      { label: 'Senepol', value: 'Senepol' },
                      { label: 'Charolês', value: 'Charolês' },
                      { label: 'Sindi', value: 'Sindi' },
                    ]}
                  />

                  <Input
                    style={{ width: '100%' }}
                    placeholder="Peso (KG)"
                    name="peso"
                    keyboardType="numeric"
                  />

                  <Dropdown
                    title="Estado"
                    name="estado"
                    pickerItems={[
                      { label: 'Selecione um estado', value: '' },
                      {
                        label: 'Minas Gerais - MG',
                        value: 'Minas Gerais - MG',
                      },
                      { label: 'Acre - AC', value: 'Acre - AC' },
                      { label: 'Alagoas - AL', value: 'Alagoas - AL' },
                      { label: 'Amapá - AP', value: 'Amapá - AP' },
                      { label: 'Amazonas - AM', value: 'Amazonas - AM' },
                      { label: 'Bahia - BA', value: 'Bahia - BA' },
                      { label: 'Ceará - CE', value: 'Ceará - CE' },
                      {
                        label: 'Distrito Federal - DF',
                        value: 'Distrito Federal - ',
                      },
                      {
                        label: 'Espírito Santo - ES',
                        value: 'Espírito Santo - ES',
                      },
                      { label: 'Goiás - GO', value: 'Goiás - GO' },
                      { label: 'Maranhão - MA', value: 'Maranhão - MA' },
                      { label: 'Mato Grosso - MT', value: 'Mato Grosso - MT' },
                      {
                        label: 'Mato Grosso do Sul - MS',
                        value: 'Mato Grosso do Sul - MS',
                      },
                      { label: 'Pará - PA', value: 'Pará - PA' },
                      { label: 'Paraíba - PB', value: 'Paraíba - PB' },
                      { label: 'Paraná - PR', value: 'Paraná - PR' },
                      { label: 'Pernambuco - PE', value: 'Pernambuco - PE' },
                      { label: 'Piauí - PI', value: 'Piauí - PI' },
                      { label: 'Roraima - RR', value: 'Roraima - RR' },
                      { label: 'Rondônia - RO', value: 'Rondônia - RO' },
                      {
                        label: 'Rio de Janeiro - RJ',
                        value: 'Rio de Janeiro - RJ',
                      },
                      {
                        label: 'Rio Grande do Norte - RN',
                        value: 'Rio Grande do Norte - RN',
                      },
                      {
                        label: 'Rio Grande do Sul - RS',
                        value: 'Rio Grande do Sul - RS',
                      },
                      {
                        label: 'Santa Catarina - SC',
                        value: 'Santa Catarina - SC',
                      },
                      { label: 'São Paulo - SP', value: 'São Paulo - SP' },
                      { label: 'Sergipe - SE', value: 'Sergipe - SE' },
                      { label: 'Tocantins - TO', value: 'Tocantins - TO' },
                    ]}
                  />

                  <Input
                    style={{ width: '100%' }}
                    placeholder="Cidade"
                    name="cidade"
                  />

                  <Dropdown
                    title="Sexo"
                    name="sexo"
                    pickerItems={[
                      { label: 'Selecione o sexo', value: '' },
                      { label: 'Fêmea', value: 'Fêmea' },
                      { label: 'Macho', value: 'Macho' },
                    ]}
                  />

                  <DatePicker
                    name="nascimento"
                    title="Nascimento"
                    initialWithNull
                  />

                  <Button
                    isLoading={isLoading}
                    onPress={() => formRef.current?.submitForm()}
                  >
                    Buscar
                  </Button>

                  <Button onPress={handleShowForm}>Ocular formulário</Button>
                </Form>
              ) : (
                <SearchButtonContainer>
                  <Button onPress={handleShowForm}>
                    Exibir Formulário de Busca
                  </Button>
                </SearchButtonContainer>
              )}

              <AnimalsContainer>
                {animals.map(animal => (
                  <Animal
                    key={animal.id}
                    onPress={() =>
                      handleNavigateToAnimal(animal.id, animal.nascimento)
                    }
                  >
                    <AnimalInfo>
                      <AnimalId>{animal.nome_ou_brinco}</AnimalId>
                      <AnimalRace>{`${animal.raca} ${animal.sexo}`}</AnimalRace>
                    </AnimalInfo>
                    <Icon name="chevron-right" size={40} color="#74d469" />
                  </Animal>
                ))}
              </AnimalsContainer>
            </Content>
          </ScrollView>
        </Container>
      </KeyboardAvoidingView>
    </>
  );
};

export default AnimalsList;
