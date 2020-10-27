import styled from 'styled-components/native';
import DatePicker from 'react-native-datepicker';

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
  width: 110px;
`;

export const DatePickerContainer = styled.View`
  padding: 10px;
`;

export const DatePickerInput = styled(DatePicker)`
  width: 200px;
`;
