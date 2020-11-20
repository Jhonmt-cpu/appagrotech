import styled from 'styled-components/native';

import { Form as Unform } from '@unform/mobile';

export const Container = styled.View`
  justify-content: center;
`;

export const Form = styled(Unform)`
  padding: 24px;
  width: 100%;
`;

export const DosesContainer = styled.View`
  flex-direction: row;
  width: 100%;
`;
