import React, { useEffect, useRef, useState } from 'react';
import { PickerProps } from 'react-native';
import { useField } from '@unform/core';

import { Container, SubTitle, DropDown } from './styles';

interface PickerItem {
  label: string;
  value: string;
}

interface DropdownProps extends PickerProps {
  title: string;
  name: string;
  pickerItems: PickerItem[];
}

interface DropdownValueReference {
  value: string;
}

const Dropdown: React.FC<DropdownProps> = ({
  title,
  name,
  pickerItems,
  ...rest
}) => {
  const dropdownElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const dropdownValueRef = useRef<DropdownValueReference>({
    value: pickerItems[0].value,
  });

  const [picker, setPicker] = useState('');

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: dropdownValueRef.current,
      path: 'value',
      setValue(reference: any, value) {
        dropdownValueRef.current.value = value;
        dropdownElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        dropdownValueRef.current.value = '';
        dropdownElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);
  return (
    <Container>
      <SubTitle>{title}</SubTitle>
      <DropDown
        ref={dropdownElementRef}
        selectedValue={picker}
        onValueChange={(value, index) => {
          dropdownValueRef.current.value = String(value);
          setPicker(String(value));
        }}
        {...rest}
      >
        {pickerItems.map(pickerItem => (
          <DropDown.Item
            key={pickerItem.value}
            label={pickerItem.label}
            value={pickerItem.value}
          />
        ))}
      </DropDown>
    </Container>
  );
};

export default Dropdown;
