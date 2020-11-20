import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isChecked: boolean;
}

export const Container = styled.TouchableOpacity<ContainerProps>`
  background: #fff;
  height: 50px;
  border-radius: 10px;
  border: 2px solid #fff;
  margin-bottom: 10px;

  ${props =>
    props.isChecked &&
    css`
      border: 2px solid #74d469;
    `}

  flex-direction: row;
  align-items: center;
`;

export const CheckBoxText = styled.Text`
  font-weight: bold;
`;
