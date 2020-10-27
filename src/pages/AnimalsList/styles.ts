import styled from 'styled-components/native';
import {
  getBottomSpace,
  getStatusBarHeight,
} from 'react-native-iphone-x-helper';
import { Form as Unform } from '@unform/mobile';

export const Container = styled.View`
  flex: 1;
  background: #fff;
  width: 100%;
`;

export const Header = styled.View`
  padding: 24px;
  width: 100%;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #74d469;

  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const BackButton = styled.TouchableOpacity``;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  margin-left: 16px;
  font-weight: bold;
`;

export const ProfileButton = styled.TouchableOpacity`
  margin-left: auto;
`;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const Content = styled.View`
  width: 100%;
`;

export const RegisterAnimalButtonContainer = styled.View`
  padding: 24px 24px 0 24px;
`;

export const Form = styled(Unform)`
  width: 100%;
  padding: 24px;
  background: #fcfcfc;
`;

export const SearchButtonContainer = styled.View`
  width: 100%;
  padding: 20px 24px 24px 24px;
`;

export const AnimalsContainer = styled.View`
  padding: 0 24px 55px 24px;
`;

export const Animal = styled.TouchableOpacity`
  border: 1px solid #74d469;
  border-radius: 20px;
  padding: 10px;
  margin-bottom: 10px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const AnimalInfo = styled.View``;

export const AnimalId = styled.Text`
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: bold;
  color: #74d469;
`;

export const AnimalRace = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #74d469;
`;
