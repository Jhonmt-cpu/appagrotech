import React, { useCallback, useRef, useState } from 'react';
import {
  StatusBar,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';

import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import api from '../../services/api';

import getValidationErrors from '../../utils/getValidationErrors';

import CommonHeader from '../../components/CommonHeader';
import Input from '../../components/Input';
import Dropdown from '../../components/Dropdown';
import Button from '../../components/Button';
import DatePicker from '../../components/DatePicker';

import { Container, Form } from './styles';

interface CreateAnimalFormData {
  nome_ou_brinco: string;
  peso: number;
  raca: string;
  sexo: string;
  cidade: string;
  estado: string;
  nascimento: string;
}

interface IAnimals {
  id: string;
  nome_ou_brinco: string;
  raca: string;
  sexo: string;
}

const CadastroAnimal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: CreateAnimalFormData) => {
    try {
      setIsLoading(true);

      const schema = Yup.object().shape({
        nome_ou_brinco: Yup.string().required('Nome/Brinco obrigatório'),
        peso: Yup.string().required('Peso obrigatório'),
        cidade: Yup.string().required('Cidade obrigatória'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      await api.post<IAnimals>('animals', data);

      Alert.alert('Cadastro realizado com sucesso');

      formRef.current?.clearField('peso');
      formRef.current?.clearField('cidade');
      formRef.current?.clearField('nome_ou_brinco');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        Alert.alert('Animal não cadastrado', errors[0]);

        return;
      }
      Alert.alert(
        'Cadastro não foi realizado, cheque as credenciais e tente novamente',
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView>
        <StatusBar backgroundColor="#74d469" />
        <Container>
          <CommonHeader hasBackIcon title="Cadastro de animal" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <Input
              name="nome_ou_brinco"
              placeholder="Nome ou brinco do animal"
              style={{ width: '100%' }}
            />

            <Dropdown
              name="raca"
              title="Raça"
              pickerItems={[
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
              name="peso"
              keyboardType="numeric"
              placeholder="Peso em quilos do animal"
              style={{ width: '100%' }}
            />

            <Dropdown
              title="Estado"
              name="estado"
              pickerItems={[
                { label: 'Minas Gerais - MG', value: 'Minas Gerais - MG' },
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
                { label: 'Espírito Santo - ES', value: 'Espírito Santo - ES' },
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
                { label: 'Rio de Janeiro - RJ', value: 'Rio de Janeiro - RJ' },
                {
                  label: 'Rio Grande do Norte - RN',
                  value: 'Rio Grande do Norte - RN',
                },
                {
                  label: 'Rio Grande do Sul - RS',
                  value: 'Rio Grande do Sul - RS',
                },
                { label: 'Santa Catarina - SC', value: 'Santa Catarina - SC' },
                { label: 'São Paulo - SP', value: 'São Paulo - SP' },
                { label: 'Sergipe - SE', value: 'Sergipe - SE' },
                { label: 'Tocantins - TO', value: 'Tocantins - TO' },
              ]}
            />

            <Input
              name="cidade"
              placeholder="Cidade de origen do animal"
              style={{ width: '100%' }}
            />

            <Dropdown
              title="Sexo"
              name="sexo"
              pickerItems={[
                { label: 'Fêmea', value: 'Fêmea' },
                { label: 'Macho', value: 'Macho' },
              ]}
            />

            <DatePicker name="nascimento" title="Nascimento" />

            <Button
              isLoading={isLoading}
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Cadastar
            </Button>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default CadastroAnimal;
