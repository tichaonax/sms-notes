import React, { useEffect } from "react";
import { Button } from 'antd';
import {
  UploadOutlined,
  DownloadOutlined,
  DeleteOutlined,
  CopyOutlined,
  ImportOutlined
} from '@ant-design/icons';

import { useFilePicker } from 'use-file-picker';
import { ActiveNoteState, Item, loadSmsNotes } from "state";
import { useAppDispatch } from "hooks/hooks";
import { formatTitle } from "utils";

export interface MenuProps {
    onImportFromClipBoard: () => void,
    onCopyNoteToClipBoard: () => void,
    onCopyNotesToClipBoard: () => void,
    onExportNotes: (title : string, isActiveNote:boolean) => void
    activeNote: ActiveNoteState,
    onDeleteNotes: () => void,
    onImportFromFile: (newItems:Item[]) => void,
    onImportSystemNotes: () => void,
    onDeleteSystemNotes: () => void,
}

export const Menu = ({
            onExportNotes,
            onDeleteNotes,
            onCopyNoteToClipBoard,
            onCopyNotesToClipBoard,
            onImportFromClipBoard,
            onImportFromFile,
            activeNote,
            onImportSystemNotes,
            onDeleteSystemNotes,
        } : MenuProps) => {
            
    const [openFileSelector, { filesContent, loading, errors, plainFiles, clear }] = useFilePicker({
            multiple: true,
            readAs: 'Text',
            accept: ['.json'],
            limitFilesConfig: { min: 1, max: 1},
            readFilesContent: true,
        });
        const dispatch = useAppDispatch();
        useEffect(() => {
            if (filesContent.length > 0) {
                const file = filesContent[0];
                const newItems = JSON.parse(file.content);
                dispatch(loadSmsNotes(newItems));
                onImportFromFile(newItems)
            }
        }, [filesContent, dispatch, onImportFromFile]);

        if (errors.length) {
        return (
            <div>
                <Button onClick={() => openFileSelector()}>Something went wrong, retry! </Button>
                {errors[0].fileSizeTooSmall && 'File size too small!'}
                {errors[0].fileSizeToolarge && 'File size too big!'}
                {errors[0].readerError && 'Error reading file!'}
                {errors[0].maxLimitExceeded && 'Too many files'}
                {errors[0].minLimitNotReached && 'Not enough files'}
            </div>
        );
        }
    
        if (loading) {
        return <div>Loading...</div>;
        }
    return (
        <div className="menu">
            <div className="menu-item">
                <Button icon={<UploadOutlined />} onClick={() => openFileSelector()} >
                    Import Notes
                </Button>
             </div>
             <div className="menu-item">
                <Button icon={<ImportOutlined />} onClick={() => onImportSystemNotes()}>Add System Notes</Button>
            </div>
                {activeNote?.item?.title &&
                (
                <div className="menu-item">
                    <Button icon={<DownloadOutlined />} onClick={() => onExportNotes(formatTitle(activeNote?.item?.title,'note-export-'),true)}>Export Active Note</Button>
                </div>
                )}
            <div className="menu-item">
                <Button icon={<DownloadOutlined />} onClick={() => onExportNotes(formatTitle('','note-export-'),false)}>Export All Notes</Button>
            </div>
            <div className="menu-item">
                <Button icon={<CopyOutlined />} onClick={() => onCopyNoteToClipBoard()}>Copy Current Note To ClipBoard</Button>
            </div>
            <div className="menu-item">
                <Button icon={<CopyOutlined />} onClick={() => onCopyNotesToClipBoard()}>Copy All Notes To ClipBoard</Button>
            </div>
            <div className="menu-item">
                <Button icon={<ImportOutlined />} onClick={() => onImportFromClipBoard()}>Import Notes From ClipBoard</Button>
            </div>
            <div className="menu-item">
                <Button icon={<DeleteOutlined />} onClick={() => onDeleteSystemNotes()}>Delete System Notes</Button>
            </div>
            <div className="menu-item">
                <Button icon={<DeleteOutlined  />} onClick={() => onDeleteNotes()}>Delete Listed Notes</Button>
            </div>
        </div>
    );
}