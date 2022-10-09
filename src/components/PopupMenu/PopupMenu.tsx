import React, { useState } from "react";
import Popup from 'reactjs-popup';
import { Button } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

import { AddNoteProps, Menu, MenuProps } from "components";

export interface PopupMenuProps extends AddNoteProps, MenuProps {
}

export const PopupMenu = ({
    onExportNotes,
    onCopyNoteToClipBoard,
    onCopyNotesToClipBoard,
    onImportFromClipBoard,
    onImportFromFile,
    activeNote,
    onDeleteNotes,
    onImportSystemNotes,
    onDeleteSystemNotes,
    onNotify,
    onNotifySuccess,
    onNotifyError,
  }: PopupMenuProps) => {

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  return (
    <div>
      <Button icon={<MenuOutlined />} onClick={() => setOpen(o => !o)}/>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal">
          <a className="close" onClick={closeModal}>
            &times;
          </a>
          <Menu 
            onExportNotes={onExportNotes}
            onCopyNoteToClipBoard={onCopyNoteToClipBoard}
            onCopyNotesToClipBoard={onCopyNotesToClipBoard}
            onImportFromClipBoard={onImportFromClipBoard}
            onImportFromFile={onImportFromFile}
            activeNote={activeNote}
            onDeleteNotes={onDeleteNotes} 
            onImportSystemNotes={onImportSystemNotes}
            onDeleteSystemNotes={onDeleteSystemNotes}
            onNotify={onNotify}
            onNotifySuccess={onNotifySuccess}
            onNotifyError={onNotifyError}           
          />
        </div>
      </Popup>
    </div>
  );
};