import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { ScrollView } from 'react-native-gesture-handler';

import { useNavigation, useRoute } from '@react-navigation/native';

import CommonHeader from '../../components/CommonHeader';

import {
  Container,
  InfoContainer,
  Line,
  DataOne,
  DataTwo,
  CarenciaContainer,
  CarenciaText,
  RegisterDoencaButton,
  RegisterDoencaButtonText,
} from './styles';
import api from '../../services/api';

export interface IVacine {
  id: string;
  name: string;
  dose_number: string;
  doses_period: string;
  date: string;
  anotacoes: string;
}

interface RouteParams {
  vacine_id: string;
}

const VacinesDtails: React.FC = () => {
  const [reloadPage, setReloadPage] = useState(false);

  const routes = useRoute();
  const { navigate, addListener } = useNavigation();

  const { vacine_id } = routes.params as RouteParams;

  const [vacine, setVacine] = useState<IVacine>({} as IVacine);

  useEffect(() => {
    addListener('focus', _ => {
      setReloadPage(state => !state);
    });
  }, [addListener]);

  useEffect(() => {
    api.get(`vacines/show-vacine/${vacine_id}`).then(response => {
      setVacine(response.data);
    });
  }, [reloadPage, vacine_id]);

  const navigateToEditVacine = useCallback(() => {
    navigate('EditVacine', { vacine });
  }, [navigate, vacine]);

  const dateString = useMemo(() => {
    const date = new Date(vacine.date);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }, [vacine.date]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#fff' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView>
          <CommonHeader hasBackIcon title={`Detalhes de ${vacine.name}`} />
          <Container>
            <InfoContainer>
              <Line>
                <DataOne>Nome</DataOne>
                <DataTwo>{vacine.name}</DataTwo>
              </Line>
              <Line>
                <DataOne>Dose</DataOne>
                <DataTwo>{`N° ${vacine.dose_number}`}</DataTwo>
              </Line>
              <Line>
                <DataOne>Data</DataOne>
                <DataTwo>{dateString}</DataTwo>
              </Line>

              <Line>
                <DataOne>Período entre doses</DataOne>
                <DataTwo>{`${vacine.doses_period} dias`}</DataTwo>
              </Line>
              <CarenciaContainer>
                <CarenciaText>
                  {vacine.anotacoes ? vacine.anotacoes : 'Vacina sem anotações'}
                </CarenciaText>
              </CarenciaContainer>
            </InfoContainer>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <RegisterDoencaButton onPress={navigateToEditVacine}>
        <RegisterDoencaButtonText>Editar vacina</RegisterDoencaButtonText>
      </RegisterDoencaButton>
    </>
  );
};

export default VacinesDtails;
