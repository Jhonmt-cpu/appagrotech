import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';

import { Container, BackButton, HeaderTitle } from './styles';

interface HeaderProps {
  title: string;
  hasBackIcon?: boolean;
}

const CommonHeader: React.FC<HeaderProps> = ({ title, hasBackIcon }) => {
  const { goBack } = useNavigation();

  const handleNavigateBack = useCallback(() => {
    goBack();
  }, [goBack]);

  return (
    <Container hasBackIcon={!!hasBackIcon}>
      {hasBackIcon && (
        <BackButton onPress={handleNavigateBack}>
          <Icon name="chevron-left" size={40} color="#000" />
        </BackButton>
      )}

      <HeaderTitle>{title}</HeaderTitle>
    </Container>
  );
};

export default CommonHeader;
