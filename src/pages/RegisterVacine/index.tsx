import React, { useState, useRef, useCallback } from 'react';
import { Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { FormHandles } from '@unform/core';

import CommonHeader from '../../components/CommonHeader';
import Input from '../../components/Input';
import DatePicker from '../../components/DatePicker';
import Button from '../../components/Button';

import api from '../../services/api';

import { Container, DosesContainer, Form } from './styles';

interface RegisterVacineForm {
  name: string;
  first_date: string;
  number_of_doses: number;
  period_days_bettwen_doses: number;
}

const RegisterVacine: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: RegisterVacineForm) => {
    try {
      setIsLoading(true);

      formRef.current?.setErrors({});

      await api.post('vacines', data);

      formRef.current?.clearField('name');
      formRef.current?.clearField('number_of_doses');
      formRef.current?.clearField('period_days_bettwen_doses');
      formRef.current?.clearField('anotacoes');

      Alert.alert('Vacina cadastrada com sucesso');

      setIsLoading(false);
    } catch (err) {
      console.log(err);

      Alert.alert('Vacina não cadastrada', 'Cheque as credenciais');

      setIsLoading(false);
    }
  }, []);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView>
        <Container>
          <CommonHeader title="Cadastro de vacina" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <DosesContainer>
              <Input
                style={{ width: '100%', textAlign: 'center', paddingLeft: 0 }}
                placeholder="Nome da vacina"
                name="name"
              />
              {/* <Input
                isHalf
                style={{ width: '100%', textAlign: 'center', paddingLeft: 0 }}
                placeholder="Período de carência"
                name="periodo_carencia"
              /> */}
            </DosesContainer>

            <DatePicker name="first_date" title="Primeira dose" />

            <DosesContainer>
              <Input
                isHalf
                style={{ width: '100%', textAlign: 'center', paddingLeft: 0 }}
                name="number_of_doses"
                keyboardType="numeric"
                placeholder="Número de doses"
              />

              <Input
                isHalf
                style={{ width: '100%', textAlign: 'center', paddingLeft: 0 }}
                placeholder="Intervalo/dias por dose"
                name="period_days_bettwen_doses"
                keyboardType="numeric"
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
              Cadastar
            </Button>
          </Form>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterVacine;
