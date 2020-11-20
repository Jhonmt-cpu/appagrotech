import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';

import CommonHeader from '../../components/CommonHeader';
import CheckBox from '../../components/CheckBox';
import Input from '../../components/Input';
import DatePicker from '../../components/DatePicker';
import Button from '../../components/Button';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  Form,
  DosesContainer,
  FormSubtitles,
  AnimalsToBeSelectedContainer,
} from './styles';

interface IAnimals {
  id: string;
  nome_ou_brinco: string;
}

interface IAnimalId {
  animal_id: string;
}

interface CheckBoxChangeEvent {
  animal_id: string;
  value: boolean;
}
interface RegisterVacineForm {
  name: string;
  first_date: string;
  number_of_doses: number;
  period_days_bettwen_doses: number;
}

const RegisterVacine: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [animals, setAnimals] = useState<IAnimals[]>([]);
  const [animalsIds, setAnimalsIds] = useState<IAnimalId[]>([]);

  const formRef = useRef<FormHandles>(null);

  const { goBack } = useNavigation();

  useEffect(() => {
    api.get<IAnimals[]>('animals').then(response => {
      setAnimals(response.data);
    });
  }, []);

  const handleSubmit = useCallback(
    async (data: RegisterVacineForm) => {
      try {
        setIsLoading(true);

        if (animalsIds.length === 0) {
          Alert.alert(
            'Vacina não cadastrada',
            'É preciso que pelo menos um animal esteja selecionado',
          );

          return;
        }

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome da vacina é obrigatório'),
          number_of_doses: Yup.string().required('Número de doses obrigatório'),
          period_days_bettwen_doses: Yup.string().required(
            'Período (em dias) entre cada dose é obrigatório',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('vacines', { ...data, animalsIds });

        formRef.current?.clearField('name');
        formRef.current?.clearField('number_of_doses');
        formRef.current?.clearField('period_days_bettwen_doses');
        formRef.current?.clearField('anotacoes');

        Alert.alert('Vacina cadastrada com sucesso');

        goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          Alert.alert('Vacina não cadastrada', errors[0]);

          return;
        }
        Alert.alert('Vacina não cadastrada', 'Cheque as credenciais');
      } finally {
        setIsLoading(false);
      }
    },
    [animalsIds],
  );

  const handleCheckBoxToggle = useCallback(
    ({ animal_id, value }: CheckBoxChangeEvent) => {
      if (value) {
        setAnimalsIds(state => [...state, { animal_id }]);
      } else {
        const newAnimalsIds = animalsIds.filter(
          a_id => a_id.animal_id !== animal_id,
        );

        setAnimalsIds(newAnimalsIds);
      }
    },
    [animalsIds],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView>
        <Container>
          <CommonHeader hasBackIcon title="Cadastro de vacina" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <FormSubtitles>Dados da vacina</FormSubtitles>
            <DosesContainer>
              <Input
                style={{ width: '100%', textAlign: 'center', paddingLeft: 0 }}
                placeholder="Nome da vacina"
                name="name"
              />
            </DosesContainer>

            <DatePicker name="first_date" title="Primeira dose" />

            <DosesContainer>
              <Input
                isHalf
                style={{ width: '100%', textAlign: 'center', paddingLeft: 0 }}
                name="number_of_doses"
                keyboardType="numeric"
                placeholder="Número de doses"
              />

              <Input
                isHalf
                style={{ width: '100%', textAlign: 'center', paddingLeft: 0 }}
                placeholder="Intervalo/dias por dose"
                name="period_days_bettwen_doses"
                keyboardType="numeric"
              />
            </DosesContainer>
            <Input
              multiline
              isTextArea
              style={{
                width: '100%',
                height: '100%',
                textAlignVertical: 'top',
              }}
              placeholder="Anotacões"
              name="anotacoes"
            />

            <AnimalsToBeSelectedContainer>
              <FormSubtitles>Animais a serem vacinados</FormSubtitles>

              {animals.map(animal => (
                <CheckBox
                  key={animal.id}
                  title={animal.nome_ou_brinco}
                  tintColors={{ true: '#74d469' }}
                  onValueChange={value =>
                    handleCheckBoxToggle({ animal_id: animal.id, value })
                  }
                />
              ))}
            </AnimalsToBeSelectedContainer>

            <Button
              onPress={() => formRef.current?.submitForm()}
              isLoading={isLoading}
            >
              Cadastar
            </Button>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterVacine;
