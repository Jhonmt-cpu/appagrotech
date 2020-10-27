import React from 'react';
import { RectButtonProperties } from 'react-native-gesture-handler';

import { Container, MenuTitle } from './styles';

interface MenuProps extends RectButtonProperties {
  title: string;
}

const Menu: React.FC<MenuProps> = ({ title }) => {
  return (
    <Container>
      <MenuTitle>{title}</MenuTitle>
    </Container>
  );
};

export default Menu;
