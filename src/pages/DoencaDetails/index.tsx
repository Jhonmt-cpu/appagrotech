import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { useNavigation, useRoute } from '@react-navigation/native';

import CommonHeader from '../../components/CommonHeader';

import {
  Container,
  InfoContainer,
  Line,
  DataOne,
  DataTwo,
  AnotacoesContainer,
  AnotacoesText,
  RegisterDoencaButton,
  RegisterDoencaButtonText,
} from './styles';
import api from '../../services/api';

export interface IDoenca {
  id: string;
  nome_doenca: string;
  periodo_carencia: string;
  remedios: string;
  data: string;
  descricao: string;
}

interface RouteParams {
  doenca_id: string;
}

const VacinesDtails: React.FC = () => {
  const [reloadPage, setReloadPage] = useState(false);

  const routes = useRoute();
  const { navigate, addListener } = useNavigation();

  const { doenca_id } = routes.params as RouteParams;

  const [doenca, setDoenca] = useState<IDoenca>({} as IDoenca);

  useEffect(() => {
    addListener('focus', () => {
      setReloadPage(state => !state);
    });
  }, [addListener]);

  useEffect(() => {
    api.get(`doencas/${doenca_id}`).then(response => {
      setDoenca(response.data);
    });
  }, [reloadPage, doenca_id]);

  const handleNavigateToEditDoenca = useCallback(() => {
    navigate('EditDoenca', { doenca });
  }, [navigate, doenca]);

  const dateString = useMemo(() => {
    const date = new Date(doenca.data);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }, [doenca.data]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1, backgroundColor: '#fff' }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView>
          <CommonHeader
            hasBackIcon
            title={`Detalhes de ${doenca.nome_doenca}`}
          />
          <Container>
            <InfoContainer>
              <Line>
                <DataOne>Nome</DataOne>
                <DataTwo>{doenca.nome_doenca}</DataTwo>
              </Line>
              <Line>
                <DataOne>Data</DataOne>
                <DataTwo>{dateString}</DataTwo>
              </Line>

              <Line>
                <DataOne>Período de carência</DataOne>
                <DataTwo>{`${doenca.periodo_carencia} dias`}</DataTwo>
              </Line>

              <Line>
                <DataOne>Remédios</DataOne>
                <DataTwo>{doenca.remedios}</DataTwo>
              </Line>
              <AnotacoesContainer>
                <AnotacoesText>
                  {doenca.descricao ? doenca.descricao : 'Doença sem descrição'}
                </AnotacoesText>
              </AnotacoesContainer>
            </InfoContainer>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>

      <RegisterDoencaButton onPress={handleNavigateToEditDoenca}>
        <RegisterDoencaButtonText>Editar doença</RegisterDoencaButtonText>
      </RegisterDoencaButton>
    </>
  );
};

export default VacinesDtails;
