import React, { useCallback, useState } from 'react';
import Check, { CheckBoxProps } from '@react-native-community/checkbox';

import { Container, CheckBoxText } from './styles';

interface CheckBoxPropsContainer extends CheckBoxProps {
  title: string;
}

const CheckBox: React.FC<CheckBoxPropsContainer> = ({ title, ...rest }) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const handleToggleCheckBox = useCallback(() => {
    setToggleCheckBox(state => !state);
  }, []);

  return (
    <Container isChecked={toggleCheckBox}>
      <Check
        {...rest}
        disabled={false}
        value={toggleCheckBox}
        onChange={handleToggleCheckBox}
      />
      <CheckBoxText>{title}</CheckBoxText>
    </Container>
  );
};

export default CheckBox;
