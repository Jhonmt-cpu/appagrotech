import React, { useCallback, useRef, useState } from 'react';
import {
  Image,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import {
  Container,
  Title,
  ForgotPassword,
  ForgotPasswordText,
  CreateAccountButton,
  CreateAccountButtonText,
} from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const navigation = useNavigation();

  const { signIn } = useAuth();

  const handleSignIn = useCallback(
    async (data: SignInFormData) => {
      try {
        setIsLoading(true);
        formRef.current?.setErrors({});
        await signIn({
          email: data.email,
          password: data.password,
        });
      } catch (err) {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao tentar fazer login, cheque as credenciais',
        );
        setIsLoading(false);
      }
    },
    [signIn],
  );
  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView keyboardShouldPersistTaps="handled">
          <Container>
            <Image style={{ width: 200, height: 200 }} source={logoImg} />

            <View>
              <Title>Agrotech</Title>
            </View>

            <Form
              onSubmit={handleSignIn}
              ref={formRef}
              style={{ width: '100%' }}
            >
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType="email-address"
                name="email"
                title="Email"
              />

              <Input
                autoCorrect={false}
                autoCapitalize="none"
                secureTextEntry
                name="password"
                title="Senha"
              />

              <Button
                isLoading={isLoading}
                onPress={() => {
                  formRef.current?.submitForm();
                }}
              >
                Entrar
              </Button>
            </Form>

            <ForgotPassword>
              <ForgotPasswordText
                onPress={() => navigation.navigate('SendForgotEmail')}
              >
                Esqueci minha senha
              </ForgotPasswordText>
            </ForgotPassword>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
      </CreateAccountButton>
    </>
  );
};

export default SignIn;
