import React, { useState, useRef, useCallback } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute, useNavigation } from '@react-navigation/native';

import * as Yup from 'yup';
import { FormHandles } from '@unform/core';

import CommonHeader from '../../components/CommonHeader';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, DosesContainer, Form } from './styles';

interface RegisterDoencaForm {
  nome_doenca: string;
  animal_id: string;
  data: string;
  descricao: string;
  remedios: string;
  periodo_carencia: number;
}

interface RouteParams {
  animal_id: string;
  nome_ou_brinco: string;
}

const RegisterDoenca: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const { navigate } = useNavigation();
  const route = useRoute();

  const { animal_id, nome_ou_brinco } = route.params as RouteParams;

  const handleSubmit = useCallback(
    async (data: RegisterDoencaForm) => {
      try {
        setIsLoading(true);

        const schema = Yup.object().shape({
          nome_doenca: Yup.string().required('Nome da doença é obrigatório'),
          periodo_carencia: Yup.string().required(
            'Período de carência obrigatório (Digite 0 caso não haja período de carência)',
          ),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('doencas', { ...data, animal_id });

        formRef.current?.reset();

        Alert.alert('Doença cadastrada com sucesso');

        navigate('AnimalDetails');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          Alert.alert('Doença não cadastrada', errors[0]);

          return;
        }
        Alert.alert('Doença não cadastrada', 'Tente Novamente mais tarde');
      } finally {
        setIsLoading(false);
      }
    },
    [animal_id, navigate],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView>
        <Container>
          <CommonHeader
            hasBackIcon
            title={`Cadastro de doença para ${nome_ou_brinco}`}
          />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <DosesContainer>
              <Input
                style={{ width: '100%', textAlign: 'center', paddingLeft: 0 }}
                placeholder="Nome da doença"
                name="nome_doenca"
              />
            </DosesContainer>

            <Input
              style={{ width: '100%', textAlign: 'center', paddingLeft: 0 }}
              name="periodo_carencia"
              keyboardType="numeric"
              placeholder="Período de carência (dias)"
            />

            <Input
              multiline
              isTextArea
              style={{
                width: '100%',
                height: '100%',
                textAlignVertical: 'top',
              }}
              placeholder="Descrição da doença"
              name="descricao"
            />

            <Input
              multiline
              isTextArea
              style={{
                width: '100%',
                height: '100%',
                textAlignVertical: 'top',
              }}
              placeholder="Remédios"
              name="remedios"
            />
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

export default RegisterDoenca;
