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

import Input from '../../components/Input';
import Button from '../../components/Button';

import logoImg from '../../assets/logo.png';

import { Container, Title, BackToSignIn, BackToSignInText } from './styles';
import api from '../../services/api';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleSignUp = useCallback(
    async (data: SignUpFormData) => {
      try {
        setIsLoading(true);
        formRef.current?.setErrors({});
        await api.post('/users', data);

        Alert.alert(
          'Cadastro realizado com sucesso',
          'Você já pode fazer login na aplicação',
        );

        navigation.navigate('SignIn');
      } catch (err) {
        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao tentar fazer o cadastro, tente novamente',
        );
      } finally {
        setIsLoading(false);
      }
    },
    [navigation],
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
              <Title>Crie sua conta</Title>
            </View>

            <Form
              onSubmit={handleSignUp}
              ref={formRef}
              style={{ width: '100%' }}
            >
              <Input autoCapitalize="words" name="name" title="Nome" />
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
                Cadastrar
              </Button>
            </Form>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <BackToSignIn onPress={() => navigation.navigate('SignIn')}>
        <BackToSignInText>Voltar para login</BackToSignInText>
      </BackToSignIn>
    </>
  );
};

export default SignUp;
