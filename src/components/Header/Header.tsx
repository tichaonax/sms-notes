import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Media from 'react-media';
import { ExclamationCircleOutlined, SaveOutlined, ExportOutlined, CopyOutlined } from '@ant-design/icons';
import { formatTitle, getFileName, mediaQueries } from 'utils';
import styles from './Header.module.scss';
import { NoteDeleted, Search, SearchProps, SEARCH_TEXT_FIELD_ID, SelectViewableProps, SelectViewableSize } from 'components';
import { Button, Modal } from 'antd';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { useAppDispatch } from 'hooks/hooks';
import { addSmsNote, DocType, Item, loadSmsNotes, setActiveItem, setDirtyItem } from 'state';
import uuid from 'react-uuid';
import { UseRefType } from 'containers';
import { ToastControl } from 'App';

declare global {
    interface WindowEventMap {
      keydown: React.KeyboardEvent<HTMLInputElement>
    }
  }
export interface UserControl {
    toggleTheme: () => void,
}

export interface HeaderProps extends SearchProps, UserControl, SelectViewableProps, NoteDeleted, UseRefType, ToastControl {
    title: string,
    body: string,
    hideBackButton?: boolean,
    showSearch?: boolean,
    showPdfExport?: boolean,
    printRef: React.MutableRefObject<HTMLInputElement | null>,
    showHeader?: boolean,
    showEditNote?: boolean,
    setFiltered: (filtered: any) => void,
    setSearchText: (text: string) => void,
    setSmsNotes: (notes: any) => void,
    smsNotes: Item[],
    filtered: Item[],
    singleNoteDeleted: boolean,
}

export const headerEmptyTitle = 'No Title';

const onGeneratePDF = async (printRef: React.MutableRefObject<HTMLInputElement | null>, header : string, orientation : any, onNotifySuccess : any) => {
    const element = printRef.current as HTMLInputElement;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');
    const pdf = new jsPDF(orientation,'pt','a4');
    const imgProperties = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(getFileName(header,'pdf'));
    onNotifySuccess("Export to PDF successful");
}; 

export const Header: React.FC<HeaderProps> = ({ 
    placeholder,
    handleChange,
    value,
    handleClearSearch,
    handleAddNote,
    onExportNotes,
    onCopyNoteToClipBoard,
    onCopyNotesToClipBoard,
    onImportFromClipBoard,
    onImportFromFile,
    onImportSystemNotes,
    onDeleteSystemNotes,
    notesCount,
    activeNote,
    showPdfExport,
    hideBackButton,
    showSearch,
    printRef,
    title,
    showHeader,
    showEditNote,
    onDeleteNotes,
    toggleTheme,
    filtered,
    setFiltered,
    setViewableSize,
    viewableSize,
    setSmsNotes,
    smsNotes,
    singleNoteDeleted,
    setSingleNoteDeleted,
    body,
    textFieldId,
    setSearchText,
    onNotify,
    onNotifySuccess,
    onNotifyError,
}) => {
    const navigate = useNavigate();
     const { confirm } = Modal;
    const [noteUpdated, setNoteUpdated] = useState(false);
    const [noteUpdateCount, setNoteUpdateCount] = useState(0);
    const [newNoteMode, setNewNoteMode] = useState(false);
    const dispatch = useAppDispatch();
    
    const handleUserKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        const { key, ctrlKey } = event;
        console.dir(event);
        if(ctrlKey) {
            switch (key) {
                case "s":{
                    event.preventDefault();
                    onNoteUpdated();
                    break;
                }

                case "f":{
                    event.preventDefault();
                    document.getElementById(SEARCH_TEXT_FIELD_ID)?.focus();
                    break;
                }

                case "x":{
                    const searchText = document.getElementById(SEARCH_TEXT_FIELD_ID) as HTMLFormElement;
                    if(searchText){
                        event.preventDefault();
                        searchText.value = '';
                        setSearchText('');
                    }
                    break;
                }

                case "m":{
                    event.preventDefault();
                    handleAddNote(DocType.Markdown);
                    break;
                }

                case "g":{
                    event.preventDefault();
                    handleAddNote(DocType.Mermaid);
                    break;
                }

                default:
                    break;
            }
        }
    }
    
    useEffect(() => {
        window.addEventListener('keydown', handleUserKeyPress)
        return () => {
            window.removeEventListener('keydown', handleUserKeyPress)
        }
    })

    const onEditField = (field: string, value:string) =>{

        let noteUuid = activeNote?.item?.uuid;
        if (!noteUuid){
            noteUuid = uuid();
            setNewNoteMode(true);
        }

        const updatedNote = {
            ...activeNote.item,
            uuid: noteUuid,
            [field]: value,
            lastModified: Date.now(),
          } as Item;
          setNoteUpdated(true);
          setNoteUpdateCount(noteUpdateCount + 1 );
          dispatch(setActiveItem(updatedNote));
          dispatch(setDirtyItem(updatedNote));
          setSingleNoteDeleted(false);
    }

    const onNoteUpdated = () => {
        setNoteUpdated(false);
        dispatch(addSmsNote(activeNote.dirtyItem));
        handleSaveNote(activeNote.dirtyItem);
    };

    const handleSaveNote = (note: Item) => {
        let notes = [...smsNotes];
        const position = notes.findIndex(x => x.uuid === note.uuid);

        let updatedList;

        switch(position) {
            case -1:
                updatedList=[note, ...notes];
                setSmsNotes(updatedList);
                setFiltered(updatedList);
              break;

            default:
                notes[position] = note;
                updatedList=[...notes];
                setSmsNotes(updatedList);

                if(filtered.length < smsNotes.length){
                    let copyFiltered = [...filtered];
                    copyFiltered[copyFiltered.findIndex(x => x.uuid === note.uuid)] = note;
                    setFiltered(copyFiltered);
                }else {
                    setFiltered(updatedList);
                }
          }
          dispatch(loadSmsNotes(updatedList));
          if(position === -1) {
            navigate(`/master/detail/${note.uuid}`);
          }
    }

    useEffect(() =>{
        if(newNoteMode){
            setNewNoteMode(false);
            dispatch(addSmsNote(activeNote.dirtyItem));
        }
    }, [activeNote, dispatch, newNoteMode]);


    useEffect(() => {
        if(noteUpdated && noteUpdateCount !==0 && !newNoteMode)
        confirm({
            title: 'Loose your changes?',
            icon: <ExclamationCircleOutlined />,
            content: 'Your note has been updated but not saved',
            okText: 'Ok to loose updates',
            okType: 'danger',
            cancelText: 'Save',
        
            onOk() {
              setNoteUpdated(false);
            },
        
            onCancel() {
                onNoteUpdated()
            },
          });
    }, [activeNote?.item?.uuid]); 

    return (
        <div className={styles.header}>
            <Media query={mediaQueries.md}>
                { matches => matches ? (
                    <Link to="../../" className={styles.back}
                        style={{ visibility: hideBackButton ? 'hidden' : 'visible' }}>
                        Back
                    </Link>
                ): (
                    ''
                )}
            </Media>

            <div>
                { showHeader && (
                    <h1 data-test="HeaderTitle">
                    { title }
                    <Button onClick={toggleTheme}>Set Theme</Button>
                    <SelectViewableSize setViewableSize={setViewableSize} viewableSize={viewableSize} />
                    </h1>
                )}
                {showEditNote && (
                    <div className="app-main-note-edit">
                    <input
                        type="text"
                        id="title"
                        placeholder={headerEmptyTitle}
                        value={title}
                        onChange={(e) => onEditField("title", e.target.value)}
                        autoFocus
                    />
                    <textarea
                        id="body"
                        placeholder="Write your note here..."
                        value={singleNoteDeleted ? body : activeNote.item?.note}
                        onChange={(e) => onEditField("note", e.target.value)}
                    />
                 </div>
                )}
                
                {
                showPdfExport  && (
                    <div>
                        <Button icon={<ExportOutlined />} onClick={() =>
                            onGeneratePDF(printRef,`notes-report-${formatTitle(title,'')}`,'portrait', onNotifySuccess)}>
                                Export Note To PDF
                        </Button>
                        <Button icon={<CopyOutlined />} onClick={() => onCopyNoteToClipBoard()}>
                            Export Current Note To ClipBoard
                        </Button>
                        {
                            noteUpdated ?  (
                                <Button icon={<SaveOutlined />} type="primary" onClick={() => onNoteUpdated()}>
                                    Save Note
                                </Button>) : null
                        }
                     </div>       
                    )
                }
            </div>
            {
                showSearch && (
                    <Search
                        notesCount={notesCount}
                        handleChange={handleChange}
                        handleClearSearch={handleClearSearch}
                        value={value}
                        placeholder={placeholder}
                        handleAddNote={handleAddNote}
                        onImportFromClipBoard={onImportFromClipBoard}
                        onImportFromFile={onImportFromFile}
                        onCopyNoteToClipBoard={onCopyNoteToClipBoard}
                        onCopyNotesToClipBoard={onCopyNotesToClipBoard}
                        onExportNotes={onExportNotes}
                        onDeleteNotes={onDeleteNotes}
                        activeNote={activeNote}
                        onImportSystemNotes={onImportSystemNotes}
                        onDeleteSystemNotes={onDeleteSystemNotes}
                        textFieldId={textFieldId}
                        onNotify={onNotify}
                        onNotifySuccess={onNotifySuccess}
                        onNotifyError={onNotifyError}
                    />)
            }
        </div> 
    );
}

Header.defaultProps = {
    hideBackButton: false,
    showSearch: false,
    notesCount:0,
    showPdfExport: false,
    showHeader: true,
    showEditNote: false,
};

export default Header;
