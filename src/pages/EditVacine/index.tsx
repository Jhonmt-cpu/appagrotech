import React, { useState, useRef, useCallback } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { IVacine } from '../VacineDetails';

import CommonHeader from '../../components/CommonHeader';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, DosesContainer, Form } from './styles';

interface EditVacineForm {
  name: string;
  anotacoes: string;
}

interface RouteParams {
  vacine: IVacine;
}

const EditVacine: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const routes = useRoute();
  const navigate = useNavigation();

  const { vacine } = routes.params as RouteParams;

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: EditVacineForm) => {
      try {
        setIsLoading(true);

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome da vacina é obrigatório'),
          anotacoes: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.patch(`vacines/${vacine.id}`, data);

        navigate.goBack();

        Alert.alert('Vacina atualizada com sucesso');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          Alert.alert('Vacina não atualizada', errors[0]);

          return;
        }
        Alert.alert('Vacina não atualizada', 'Cheque as credenciais');
      } finally {
        setIsLoading(false);
      }
    },
    [vacine, navigate],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView>
        <Container>
          <CommonHeader title="Edição de vacina" hasBackIcon />

          <Form initialData={vacine} ref={formRef} onSubmit={handleSubmit}>
            <DosesContainer>
              <Input
                style={{ width: '100%', textAlign: 'center', paddingLeft: 0 }}
                placeholder="Nome da vacina"
                name="name"
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

export default EditVacine;
