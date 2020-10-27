import React, { useEffect, useRef } from 'react';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, SubTitle, TextInput } from './styles';

interface InputProps extends TextInputProps {
  title?: string;
  name: string;
  isHalf?: boolean;
  isTextArea?: boolean;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.FC<InputProps> = ({
  title,
  name,
  isHalf = false,
  isTextArea = false,
  ...rest
}) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(reference: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);
  return (
    <Container isTextArea={isTextArea} isHalf={isHalf}>
      {title && <SubTitle>{title}</SubTitle>}
      <TextInput
        ref={inputElementRef}
        defaultValue={defaultValue}
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default Input;
