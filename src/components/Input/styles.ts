import styled, { css } from 'styled-components/native';

interface ContainerProps {
  isHalf: boolean;
  isTextArea: boolean;
}

export const Container = styled.View<ContainerProps>`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background-color: #74d469;
  border-radius: 20px;
  height: 50px;
  margin-bottom: 21px;

  ${props =>
    props.isHalf &&
    css`
      width: 50%;
    `}

  ${props =>
    props.isTextArea &&
    css`
      height: 300px;
    `}
`;

export const SubTitle = styled.Text`
  font-size: 17px;
  margin-left: 10px;
`;

export const TextInput = styled.TextInput`
  background-color: #fff;
  border-radius: 20px;
  width: 78%;
  height: 50px;
  border-color: #74d469;
  border-width: 2px;
  font-size: 15px;
  padding-left: 10px;
`;
