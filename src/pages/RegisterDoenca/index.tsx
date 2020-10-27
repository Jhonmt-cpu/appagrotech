import React, { useState, useRef, useCallback } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute } from '@react-navigation/native';

import { FormHandles } from '@unform/core';

import CommonHeader from '../../components/CommonHeader';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';

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
}

const RegisterDoenca: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const route = useRoute();

  const { animal_id } = route.params as RouteParams;

  const handleSubmit = useCallback(
    async (data: RegisterDoencaForm) => {
      try {
        setIsLoading(true);

        formRef.current?.setErrors({});

        await api.post('doencas', { ...data, animal_id });

        formRef.current?.reset();

        Alert.alert('Doença cadastrada com sucesso');

        setIsLoading(false);
      } catch (err) {
        console.log(err);

        Alert.alert('Doença não cadastrada', 'Tente Novamente mais tarde');

        setIsLoading(false);
      }
    },
    [animal_id],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView>
        <Container>
          <CommonHeader title="Cadastro de doença" />

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
