import React, { useCallback, useRef, useState } from 'react';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { Alert } from 'react-native';
import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import { Container, Message, LogoImg } from './styles';
import api from '../../services/api';

const SendForgotEmail: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);
  const handleSendEmail = useCallback(async (email: string) => {
    try {
      setIsLoading(true);
      formRef.current?.setErrors({});

      await api.post('password/forgot', email);

      Alert.alert(
        'Mensagem enviada com sucesso',
        'Um link para alteração de senha foi enviado para o seu email',
      );

      setIsLoading(false);
      formRef.current?.reset();
    } catch (err) {
      Alert.alert(
        'Erro no envio do email',
        'Verifique se o email está correto e tente novamente',
      );

      setIsLoading(false);
    }
  }, []);

  return (
    <Container>
      <LogoImg source={logoImg} />
      <Message>Digite o seu email cadastrado para recuperar sua senha</Message>
      <Form onSubmit={handleSendEmail} ref={formRef} style={{ width: '100%' }}>
        <Input
          name="email"
          autoCapitalize="none"
          keyboardType="email-address"
          style={{ width: '100%' }}
        />

        <Button
          isLoading={isLoading}
          onPress={() => formRef.current?.submitForm()}
        >
          Enviar
        </Button>
      </Form>
    </Container>
  );
};

export default SendForgotEmail;
