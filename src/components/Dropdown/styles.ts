import styled from 'styled-components/native';
import { Picker } from '@react-native-community/picker';

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: #74d469;
  border-radius: 20px;
  height: 50px;
  margin-bottom: 21px;
`;

export const SubTitle = styled.Text`
  font-size: 17px;
  margin-left: 10px;
`;

export const DropDown = styled(Picker)`
  background-color: #fff;
  border-radius: 20px;
  width: 250px;
  height: 50px;
  border-color: #74d469;
  border-width: 2px;
  text-align: center;
`;
