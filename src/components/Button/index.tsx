import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, ButtonText } from './styles';

interface ButtonProps extends RectButtonProperties {
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, isLoading, ...rest }) => (
  <Container {...rest}>
    <ButtonText>
      {isLoading ? <ActivityIndicator size="large" color="#000" /> : children}
    </ButtonText>
  </Container>
);

export default Button;
