import React, { useCallback, useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { FormHandles } from '@unform/core';
import { ScrollView } from 'react-native-gesture-handler';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuth } from '../../hooks/auth';

import { Container, Form, UserAvatar } from './styles';

interface ProfileFormData {
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

const Profile: React.FC = () => {
  const [isLoadind, setIsLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const { user, updateProfile } = useAuth();

  const handleUpdateProfile = useCallback(
    async (data: ProfileFormData) => {
      try {
        setIsLoading(true);
        formRef.current?.setErrors({});
        await updateProfile({
          name: data.name,
          email: data.email,
          old_password: data.old_password,
          password: data.password,
        });

        Alert.alert('Perfil atualizado com sucesso');

        formRef.current?.setData({
          email: data.email,
          name: data.name,
        });
        setIsLoading(false);
      } catch (err) {
        Alert.alert(
          'Perfil não atualizado',
          'Cheque as credencias e tente novamente',
        );

        setIsLoading(false);
      }
    },
    [updateProfile],
  );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <StatusBar backgroundColor="#f0f0f0" />
          <Form ref={formRef} onSubmit={handleUpdateProfile}>
            <UserAvatar source={{ uri: user.avatar_url }} />

            <Input
              name="name"
              style={{ width: 270 }}
              defaultValue={user.name}
              title="Nome"
            />

            <Input
              name="email"
              style={{ width: 270 }}
              keyboardType="email-address"
              defaultValue={user.email}
              title="Email"
            />

            <Input
              name="old_password"
              style={{ width: 200 }}
              secureTextEntry
              title="Senha Antiga"
            />

            <Input
              name="password"
              style={{ width: 200 }}
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
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Profile;
