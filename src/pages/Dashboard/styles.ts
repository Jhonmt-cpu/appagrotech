import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

export const Container = styled.View`
  flex: 1;
`;

export const Header = styled.View`
  padding: 24px;
  padding-top: ${getStatusBarHeight() + 24}px;
  background: #74d469;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const HeaderTitle = styled.Text`
  font-size: 20px;
  line-height: 28px;
`;

export const UserName = styled.Text`
  color: #000;
  font-weight: bold;
`;

export const ProfileButton = styled.TouchableOpacity``;

export const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 28px;
`;

export const EventsContainer = styled.View`
  background: #fff;
  padding: 24px;

  align-items: center;
`;

export const EventsTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;

export const Event = styled.View`
  margin-top: 20px;
  border: 1px solid #74d469;
  width: 100%;
  border-radius: 10px;
  padding: 20px;
`;

export const EventHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const EventName = styled.Text`
  font-size: 15px;
  font-weight: bold;
  width: 200px;
`;

export const DoseNumber = styled.Text`
  font-size: 15px;
  color: #74d469;
  font-weight: bold;
`;

export const EventDetails = styled.Text`
  margin-top: 20px;
`;

export const MenusContainer = styled.View`
  background: #fff;
  width: 100%;
  align-items: center;
  padding: 24px;
`;

export const MenusContainerTitle = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
