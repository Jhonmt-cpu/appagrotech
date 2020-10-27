import React, { useCallback, useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { useNavigation } from '@react-navigation/native';

import '../../utils/localeCalendarConfig';

import { useAuth } from '../../hooks/auth';
import api from '../../services/api';

import {
  Container,
  Header,
  HeaderTitle,
  UserName,
  ProfileButton,
  UserAvatar,
  EventsContainer,
  EventsTitle,
  Event,
  EventHeader,
  EventName,
  DoseNumber,
  EventDetails,
  MenusContainer,
  MenusContainerTitle,
} from './styles';
import Menu from '../../components/Menu';
import Button from '../../components/Button';

interface IVacinesEventForCalendar {
  [key: string]: { marked: boolean; dotColor: string };
}

interface IVacinesResponse {
  day: number;
  month: number;
  year: number;
}

interface IVacinesEvents {
  id: string;
  name: string;
  dose_number: number;
  anotacoes: string;
}

const Dashboard: React.FC = () => {
  const { navigate, addListener } = useNavigation();
  const { user, signOut } = useAuth();

  const [vacinesDays, setVacinesDays] = useState<IVacinesEventForCalendar>(
    {} as IVacinesEventForCalendar,
  );
  const [vacineEvents, setVacineEvents] = useState<IVacinesEvents[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reloadPage, setReloadPage] = useState(false);
  const [dateString, setDateString] = useState(() => {
    const today = new Date();
    const year = String(today.getFullYear()).padStart(2, '0');
    const month = String(today.getMonth()).padStart(2, '0');
    const day = today.getDate();

    return `${day}/${month}/${year}`;
  });

  useEffect(() => {
    addListener('focus', _ => {
      setReloadPage(state => !state);
    });
  }, [addListener]);

  useEffect(() => {
    api
      .get<IVacinesResponse[]>(`vacines/month-availability/${user.id}`)
      .then(response => {
        const vacinesObject = {} as IVacinesEventForCalendar;
        response.data.forEach(vacine => {
          const parsedDay = String(vacine.day).padStart(2, '0');
          const parsedMonth = String(vacine.month).padStart(2, '0');
          const date = `${vacine.year}-${parsedMonth}-${parsedDay}`;
          return (vacinesObject[date] = {
            marked: true,
            dotColor: '#74d469',
          });
        });

        setVacinesDays(vacinesObject);
      });
  }, [user.id, reloadPage]);

  useEffect(() => {
    api
      .get('vacines/day-vacines', {
        params: {
          year: selectedDate.getFullYear(),
          month: selectedDate.getMonth() + 1,
          day: selectedDate.getDate(),
        },
      })
      .then(response => {
        setVacineEvents(response.data);
      });
  }, [selectedDate]);

  const handleDateChange = useCallback((data: string) => {
    setSelectedDate(new Date(`${data}T12:00`));
    setDateString(data.split('-').reverse().join('/'));
  }, []);

  const handleNavigateToProfile = useCallback(() => {
    navigate('Profile');
  }, [navigate]);

  const handleNavigateToAnimalsList = useCallback(() => {
    navigate('AnimalsList');
  }, [navigate]);

  const handleNavigateToRegisterVacine = useCallback(() => {
    navigate('RegisterVacine');
  }, [navigate]);

  const handleSignOut = useCallback(() => {
    signOut();
  }, [signOut]);

  return (
    <Container>
      <Header>
        <HeaderTitle>
          Bem vindo(a)
          {'\n'}
          <UserName>{user.name}</UserName>
        </HeaderTitle>

        <ProfileButton onPress={handleNavigateToProfile}>
          <UserAvatar source={{ uri: user.avatar_url }} />
        </ProfileButton>
      </Header>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView>
          <Calendar
            markedDates={vacinesDays}
            theme={{ arrowColor: '#74d469', todayTextColor: '#74d469' }}
            onDayPress={day => {
              handleDateChange(day.dateString);
            }}
          />
          <EventsContainer>
            <EventsTitle>
              Vacinas para o dia
              {` ${dateString}`}
            </EventsTitle>
            {vacineEvents.map(vacineEvent => (
              <Event key={vacineEvent.id}>
                <EventHeader>
                  <EventName>{`${vacineEvent.name}`}</EventName>
                  <DoseNumber>{`Dose N° ${vacineEvent.dose_number}`}</DoseNumber>
                </EventHeader>
                <EventDetails>{vacineEvent.anotacoes}</EventDetails>
              </Event>
            ))}
          </EventsContainer>

          <MenusContainer>
            <MenusContainerTitle>Menus do App</MenusContainerTitle>

            <Button onPress={handleNavigateToAnimalsList}>
              Manejo de Gado
            </Button>

            <Button onPress={handleNavigateToRegisterVacine}>
              Registro de vacinas
            </Button>

            <Button onPress={handleSignOut}>Sair da Aplicação</Button>
          </MenusContainer>
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Dashboard;
