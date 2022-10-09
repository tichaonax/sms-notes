import { Button } from 'antd';
import React from 'react';
import { DocType } from 'state';

export interface AddNoteProps {
    handleAddNote: (docType: DocType) => void,
};

export const AddMarkDownNote = ({ handleAddNote }: AddNoteProps) => {
  return  <Button onClick={() => {handleAddNote(DocType.Markdown)}}>MD</Button>
};

export const AddMermaidNote = ({ handleAddNote }: AddNoteProps) => {
  return  <Button onClick={() => {handleAddNote(DocType.Mermaid)}}>GR</Button>
};