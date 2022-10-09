import React, { SyntheticEvent } from 'react';
import { ChangeEvent } from 'react';

export interface TextInputProps {
  value: string,
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
  placeholder: string,
  textFieldId: string
};

interface FocusEvent<T = Element> extends SyntheticEvent<T> {
  relatedTarget: EventTarget | null;
  target: EventTarget & T;
}

export const TextInput = ({ value, handleChange, placeholder, textFieldId }: TextInputProps) => {
  const handleOnFocus = (event: FocusEvent<HTMLInputElement>) => {
    // do something on focus event here
   }

  return <input id={textFieldId} type="text" value={value} onChange={handleChange} placeholder={placeholder} onFocus={handleOnFocus}/>;
};