import React, { useCallback, useRef, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import { Container, Message, LogoImg } from './styles';
import api from '../../services/api';

interface RouteParams {
  token: string;
}

interface ResetPasswordFormData {
  password: string;
  token: string;
}

const SendForgotEmail: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const route = useRoute();
  const { navigate } = useNavigation();
  const routeParams = route.params as RouteParams;

  const { token } = routeParams;

  const handleSendEmail = useCallback(
    async (data: ResetPasswordFormData) => {
      try {
        setIsLoading(true);
        formRef.current?.setErrors({});

        data.token = token;

        await api.post('password/reset', data);

        Alert.alert(
          'Senha atualizada com sucesso',
          'Você já pode logar na aplicação com a nova senha',
        );

        setIsLoading(false);

        navigate('SignIn');
      } catch (err) {
        Alert.alert(
          'Erro na alteração de senha',
          'Espere um momento e tente novamente',
        );

        setIsLoading(false);
      }
    },
    [navigate, token],
  );

  return (
    <Container>
      <LogoImg source={logoImg} />
      <Message>Digite a nova senha</Message>
      <Form onSubmit={handleSendEmail} ref={formRef} style={{ width: '100%' }}>
        <Input name="password" secureTextEntry style={{ width: '100%' }} />

        <Button
          isLoading={isLoading}
          onPress={() => formRef.current?.submitForm()}
        >
          Alterar
        </Button>
      </Form>
    </Container>
  );
};

export default SendForgotEmail;
