import React, { useState, useRef, useCallback } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useRoute, useNavigation } from '@react-navigation/native';
import * as Yup from 'yup';

import { FormHandles } from '@unform/core';
import { IAnimals } from '../AnimalsList';

import CommonHeader from '../../components/CommonHeader';
import Input from '../../components/Input';
import Button from '../../components/Button';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Form } from './styles';

interface EditAnimalForm {
  nome_ou_brinco: string;
  peso: string;
  anotacoes: string;
}

interface RouteParams {
  animal: IAnimals;
}

const EditAnimal: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const routes = useRoute();
  const navigate = useNavigation();

  const { animal } = routes.params as RouteParams;

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: EditAnimalForm) => {
      try {
        setIsLoading(true);

        const schema = Yup.object().shape({
          nome_ou_brinco: Yup.string().required(
            'Identificação do bovino é obrigatório',
          ),
          peso: Yup.string().required('Peso do bovino é obrigatório'),
          anotacoes: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.patch(`animals/${animal.id}`, data);

        navigate.goBack();

        Alert.alert('Animal atualizado com sucesso');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          Alert.alert('Animal não atualizado', errors[0]);

          return;
        }
        Alert.alert('Animal não atualizado', 'Cheque as credenciais');
      } finally {
        setIsLoading(false);
      }
    },
    [animal, navigate],
  );

  const handleDeleteAnimal = useCallback(async () => {
    try {
      await api.delete(`animals/${animal.id}`);

      Alert.alert('Animal deletado com sucesso');

      navigate.navigate('AnimalsList');
    } catch {
      Alert.alert('Animal não deletado', 'Tente novamente mais tarde');
    }
  }, [navigate, animal]);

  const handleShowModal = useCallback(() => {
    Alert.alert(
      `Deletar ${animal.nome_ou_brinco}`,
      'Você deseja realmente deletar esse animal?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        { text: 'OK', onPress: () => handleDeleteAnimal() },
      ],
      { cancelable: false },
    );
  }, [animal, handleDeleteAnimal]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView>
        <Container>
          <CommonHeader
            title={`Edição de ${animal.nome_ou_brinco}`}
            hasBackIcon
          />

          <Form initialData={animal} ref={formRef} onSubmit={handleSubmit}>
            <Input
              style={{ width: '100%', textAlign: 'center', paddingLeft: 0 }}
              placeholder="Nome ou Brinco do animal"
              name="nome_ou_brinco"
            />

            <Input
              style={{ width: '100%', textAlign: 'center', paddingLeft: 0 }}
              keyboardType="numeric"
              placeholder="Peso em quilos do animal"
              name="peso"
            />

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
            <Button
              style={{ backgroundColor: 'red' }}
              onPress={handleShowModal}
            >
              Excluir Animal
            </Button>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditAnimal;
