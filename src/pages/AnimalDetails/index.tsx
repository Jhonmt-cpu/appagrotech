import React, { useCallback, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';

import { useNavigation, useRoute } from '@react-navigation/native';

import CommonHeader from '../../components/CommonHeader';

import {
  Container,
  InfoContainer,
  Line,
  DataOne,
  DataTwo,
  CarenciaContainer,
  CarenciaText,
  VeterinaryTableContainer,
  VeterinaryTableHeader,
  VeterinaryTableTitle,
  VeterinaryTable,
  Item,
  ItemInfo,
  Info,
  Date,
  RegisterDoencaButton,
  RegisterDoencaButtonText,
} from './styles';
import api from '../../services/api';

interface IAnimal {
  id: string;
  nome_ou_brinco: string;
  peso: string;
  nascimento: string;
  raca: string;
  sexo: string;
  cidade: string;
  estado: string;
  carencia_state: boolean;
}

interface IVeterinaryTableItem {
  id: string;
  name: string;
  type: string;
  date: string;
}

interface RouteParams {
  animal_id: string;
  animal_birth_date: string;
}

const AnimalDetails: React.FC = () => {
  const [reloadPage, setReloadPage] = useState(false);

  const routes = useRoute();
  const { navigate, addListener } = useNavigation();

  const { animal_id, animal_birth_date } = routes.params as RouteParams;

  const [animal, setAnimal] = useState<IAnimal>({} as IAnimal);
  const [veterinaryTable, setVeterinaryTable] = useState<
    IVeterinaryTableItem[]
  >([]);

  useEffect(() => {
    addListener('focus', _ => {
      setReloadPage(state => !state);
    });
  }, [addListener]);

  useEffect(() => {
    api.get(`animals/${animal_id}`).then(response => {
      setAnimal(response.data);
    });

    api
      .get(
        `/veterinary-table?animal_id=${animal_id}&birth_animal_date=${animal_birth_date}`,
      )
      .then(response => {
        setVeterinaryTable(response.data);
      });
  }, [animal_id, animal_birth_date, reloadPage]);

  const handleNavigateToRegisterDesease = useCallback(() => {
    navigate('RegisterDoenca', { animal_id: animal.id });
  }, [navigate, animal.id]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#fff' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView>
          <CommonHeader title={`Detalhes de ${animal.nome_ou_brinco}`} />
          <Container>
            <InfoContainer>
              <Line>
                <DataOne>Identificação</DataOne>
                <DataTwo>{animal.nome_ou_brinco}</DataTwo>
              </Line>
              <Line>
                <DataOne>Sexo</DataOne>
                <DataTwo>{animal.sexo}</DataTwo>
              </Line>
              <Line>
                <DataOne>Raça</DataOne>
                <DataTwo>{animal.raca}</DataTwo>
              </Line>

              <Line>
                <DataOne>Peso</DataOne>
                <DataTwo>
                  {animal.peso}
                  KG
                </DataTwo>
              </Line>
              <Line>
                <DataOne>Data de nascimento</DataOne>
                <DataTwo>
                  {animal.nascimento?.split('-').reverse().join('/')}
                </DataTwo>
              </Line>
              <Line>
                <DataOne>Cidade</DataOne>
                <DataTwo>{animal.cidade}</DataTwo>
              </Line>
              <Line>
                <DataOne>Estado</DataOne>
                <DataTwo>{animal.estado}</DataTwo>
              </Line>

              <CarenciaContainer isInCarencia={animal.carencia_state}>
                <CarenciaText isInCarencia={animal.carencia_state}>
                  {animal.carencia_state
                    ? 'Bovino está em período de carencia'
                    : 'Bovino não está em período de carencia'}
                </CarenciaText>
              </CarenciaContainer>
            </InfoContainer>
            <VeterinaryTableContainer>
              <VeterinaryTable>
                <VeterinaryTableHeader>
                  <VeterinaryTableTitle>Ficha Veterinária</VeterinaryTableTitle>
                </VeterinaryTableHeader>
                {veterinaryTable.map(item => (
                  <Item key={item.id}>
                    <ItemInfo>
                      <Info>{`${item.name}`}</Info>
                      <Date>{item.date.split('-').reverse().join('/')}</Date>
                    </ItemInfo>
                    <Icon name="chevron-right" size={40} color="#74d469" />
                  </Item>
                ))}
              </VeterinaryTable>
            </VeterinaryTableContainer>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <RegisterDoencaButton onPress={handleNavigateToRegisterDesease}>
        <RegisterDoencaButtonText>
          Registrar doença no bovino
        </RegisterDoencaButtonText>
      </RegisterDoencaButton>
    </>
  );
};

export default AnimalDetails;
