import React, { useState, useRef, useCallback } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { IDoenca } from '../DoencaDetails';

import CommonHeader from '../../components/CommonHeader';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Form } from './styles';

interface EditDoencaForm {
  nome_doenca: string;
  descricao: string;
  remedios: string;
}

interface RouteParams {
  doenca: IDoenca;
}

const EditDoenca: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const routes = useRoute();
  const navigate = useNavigation();

  const { doenca } = routes.params as RouteParams;

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: EditDoencaForm) => {
      try {
        setIsLoading(true);

        const schema = Yup.object().shape({
          nome_doenca: Yup.string().required('Nome da doença é obrigatório'),
          remedios: Yup.string().required('Nome dos remédios é obrigatório'),
          descricao: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.patch(`doencas/${doenca.id}`, data);

        navigate.goBack();

        Alert.alert('Doença atualizada com sucesso');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          Alert.alert('Doença não atualizada', errors[0]);

          return;
        }
        Alert.alert(
          'Doença não atualizada',
          'Cheque as credenciais e tente mais tarde',
        );
      } finally {
        setIsLoading(false);
      }
    },
    [doenca, navigate],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView>
        <Container>
          <CommonHeader title={`Edição de ${doenca.nome_doenca}`} hasBackIcon />

          <Form initialData={doenca} ref={formRef} onSubmit={handleSubmit}>
            <Input
              style={{ width: '100%', textAlign: 'center', paddingLeft: 0 }}
              placeholder="Nome da doença"
              name="nome_doenca"
            />

            <Input
              multiline
              isTextArea
              style={{
                width: '100%',
                height: '100%',
                textAlignVertical: 'top',
              }}
              placeholder="Remédios usados contra a doença"
              name="remedios"
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

            <Button
              onPress={() => formRef.current?.submitForm()}
              isLoading={isLoading}
            >
              Salvar
            </Button>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditDoenca;
