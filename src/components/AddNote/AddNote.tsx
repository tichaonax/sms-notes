import { Button } from 'antd';
import React from 'react';

export interface AddNoteProps {
    handleAddNote: () => void,
};

export const AddNote = ({ handleAddNote }: AddNoteProps) => {
  return  <Button onClick={() => {handleAddNote()}}>Add</Button>
};