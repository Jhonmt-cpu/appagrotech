import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

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

export const RegisterVacineButtonContainer = styled.View`
  padding: 24px;
`;

export const VacinesContainer = styled.View`
  padding: 0 24px 55px 24px;
`;

export const Vacine = styled.TouchableOpacity`
  border: 1px solid #74d469;
  border-radius: 20px;
  padding: 10px;
  margin-bottom: 10px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const VacineInfo = styled.View``;

export const VacineId = styled.Text`
  font-size: 20px;
  margin-bottom: 10px;
  font-weight: bold;
  color: #74d469;
`;

export const VacineDose = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #74d469;
`;
