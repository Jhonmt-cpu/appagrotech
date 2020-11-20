import React, { useCallback, useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import * as Yup from 'yup';
import { FormHandles } from '@unform/core';
import ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';

import Icon from 'react-native-vector-icons/FontAwesome5';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';

import { Container, Form, UserAvatar, UserAvatarButton } from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

const Profile: React.FC = () => {
  const [isLoadind, setIsLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { user, signOut, updateUser } = useAuth();
  const { goBack } = useNavigation();

  const handleUpdateProfile = useCallback(
    async (data: ProfileFormData) => {
      try {
        setIsLoading(true);
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string().required('Campo nova senha obrigatório'),
            otherwise: Yup.string(),
          }),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { name, email, old_password, password } = data;

        const formData = {
          name,
          email,
          ...(old_password || password
            ? {
                old_password,
                password,
              }
            : {}),
        };

        const response = await api.put('profile', formData);

        updateUser(response.data);

        Alert.alert('Perfil atualizado com sucesso');

        goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          Alert.alert('Perfil não atualizado', errors[0]);

          return;
        }
        Alert.alert(
          'Perfil não atualizado',
          'Cheque as credencias e tente novamente',
        );
      } finally {
        setIsLoading(false);
      }
    },
    [updateUser, goBack],
  );

  const handleUpdateAvatar = useCallback(() => {
    ImagePicker.showImagePicker(
      {
        title: 'Selecione um avatar',
        cancelButtonTitle: 'Cancelar',
        takePhotoButtonTitle: 'Usar câmera',
        chooseFromLibraryButtonTitle: 'Escolha da Galeria',
      },
      response => {
        if (response.didCancel) {
          return;
        }

        if (response.error) {
          Alert.alert('Erro ao atualizar seu avatar');
        }

        const data = new FormData();

        data.append('avatar', {
          type: 'image/jpeg',
          name: `${user.id}.jpg`,
          uri: response.uri,
        });

        api
          .put('/users/avatar', data, {
            headers: {
              'Content-type': 'multipart/form-data',
              Accept: 'application/json',
            },
          })
          .then(apiResponse => {
            updateUser(apiResponse.data);
          });
      },
    );
  }, [updateUser, user.id]);
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView>
        <Container>
          <StatusBar backgroundColor="#f0f0f0" />
          <Form initialData={user} ref={formRef} onSubmit={handleUpdateProfile}>
            <UserAvatarButton onPress={handleUpdateAvatar}>
              {user.avatar_url ? (
                <UserAvatar source={{ uri: user.avatar_url }} />
              ) : (
                <Icon
                  name="user-circle"
                  size={150}
                  style={{ marginBottom: 30 }}
                />
              )}
            </UserAvatarButton>

            <Input name="name" style={{ width: '80%' }} title="Nome" />

            <Input
              name="email"
              style={{ width: '80%' }}
              keyboardType="email-address"
              title="Email"
            />

            <Input
              name="old_password"
              style={{ width: '65%' }}
              secureTextEntry
              title="Senha Antiga"
            />

            <Input
              name="password"
              style={{ width: '65%' }}
              secureTextEntry
              title="Nova Senha"
            />

            <Button
              isLoading={isLoadind}
              onPress={() => {
                formRef.current?.submitForm();
              }}
            >
              Salvar Alterções
            </Button>
            <Button onPress={signOut}>Sair do aplicativo</Button>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
