import React, { useCallback, useState, useEffect } from 'react';

import { useNavigation } from '@react-navigation/native';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Icon from 'react-native-vector-icons/Feather';
import Icon5 from 'react-native-vector-icons/FontAwesome5';

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Header,
  HeaderTitle,
  ProfileButton,
  UserAvatar,
  Content,
  RegisterVacineButtonContainer,
  VacinesContainer,
  Vacine,
  VacineInfo,
  VacineId,
  VacineDose,
} from './styles';
import api from '../../services/api';
import Button from '../../components/Button';

interface IVacines {
  id: string;
  name: string;
  dose_number: number;
}

const VacinesList: React.FC = () => {
  const [reloadPage, setReloadPage] = useState(false);
  const [vacines, setVacines] = useState<IVacines[]>([]);

  const { user } = useAuth();
  const { navigate, addListener } = useNavigation();

  useEffect(() => {
    addListener('focus', () => {
      setReloadPage(state => !state);
    });
  }, [addListener]);

  useEffect(() => {
    api.get<IVacines[]>('vacines').then(response => {
      setVacines(response.data);
    });
  }, [reloadPage]);

  const handleNavigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const handleNavigateToVacine = useCallback(
    (vacine_id: string) => {
      navigate('VacineDetails', { vacine_id });
    },
    [navigate],
  );

  const handleNavigateVacineRegister = useCallback(() => {
    navigate('RegisterVacine');
  }, [navigate]);

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <Container>
          <Header>
            <HeaderTitle>Vacinas cadastradas</HeaderTitle>

            <ProfileButton onPress={handleNavigateToProfile}>
              {user.avatar_url ? (
                <UserAvatar source={{ uri: user.avatar_url }} />
              ) : (
                <Icon5 name="user-circle" size={56} />
              )}
            </ProfileButton>
          </Header>
          <ScrollView>
            <Content>
              <RegisterVacineButtonContainer>
                <Button onPress={handleNavigateVacineRegister}>
                  Cadastrar nova vacina
                </Button>
              </RegisterVacineButtonContainer>

              <VacinesContainer>
                {vacines.map(vacine => (
                  <Vacine
                    key={vacine.id}
                    onPress={() => handleNavigateToVacine(vacine.id)}
                  >
                    <VacineInfo>
                      <VacineId>{vacine.name}</VacineId>
                      <VacineDose>{`Dose n° ${vacine.dose_number}`}</VacineDose>
                    </VacineInfo>
                    <Icon name="chevron-right" size={40} color="#74d469" />
                  </Vacine>
                ))}
              </VacinesContainer>
            </Content>
          </ScrollView>
        </Container>
      </KeyboardAvoidingView>
    </>
  );
};

export default VacinesList;
