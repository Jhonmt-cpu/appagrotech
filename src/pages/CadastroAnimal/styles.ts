import styled from 'styled-components/native';

import { Platform } from 'react-native';

import { Form as Unform } from '@unform/mobile';

export const Container = styled.View`
  padding: 0 0 40px;
  background-color: #f0f0f0;
  flex: 1;
`;

export const Form = styled(Unform)`
  margin-top: 25px;
  width: 100%;
  padding: 10px;
`;
