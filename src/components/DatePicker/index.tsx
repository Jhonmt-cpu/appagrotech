import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useField } from '@unform/core';

import { DatePickerProps as DatePickerPropsOriginal } from 'react-native-datepicker';

import {
  Container,
  SubTitle,
  DatePickerContainer,
  DatePickerInput,
} from './styles';

interface DatePickerProps extends DatePickerPropsOriginal {
  title: string;
  name: string;
  initialWithNull?: boolean;
}

interface DatePickerValueReference {
  value: string;
}

const Dropdown: React.FC<DatePickerProps> = ({
  title,
  name,
  initialWithNull,
  ...rest
}) => {
  const datePickerElementRef = useRef<any>(null);

  const [selectedDate, setSelectedDate] = useState('');

  const todayDate = useCallback(() => {
    const today = new Date();
    const year = String(today.getFullYear()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = today.getDate();

    return `${year}-${month}-${day}`;
  }, []);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);

  const datePickerValueRef = useRef<DatePickerValueReference>({
    value: initialWithNull ? '' : todayDate(),
  });

  const handleDateChanged = useCallback(data => {
    datePickerValueRef.current.value = data.split('-').reverse().join('-');
    setSelectedDate(data);
  }, []);

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: datePickerValueRef.current,
      path: 'value',
      setValue(reference: any, value) {
        datePickerValueRef.current.value = value.split('-').reverse().join('-');
        datePickerElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        datePickerValueRef.current.value = '';
        datePickerElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);
  return (
    <Container>
      <SubTitle>{title}</SubTitle>
      <DatePickerContainer>
        <DatePickerInput
          ref={datePickerElementRef}
          date={selectedDate}
          format="DD-MM-YYYY"
          onDateChange={handleDateChanged}
          {...rest}
        />
      </DatePickerContainer>
    </Container>
  );
};

export default Dropdown;
