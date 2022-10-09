import React, { createRef, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import Media from 'react-media';
import { Modal } from 'antd';
import uuid from 'react-uuid';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { dedupeSmsNotes, getFileName, getLastPathItem, mediaQueries } from 'utils';
import styles from './MasterDetail.module.scss';
import {
    addSmsNote,
    deleteSmsNoteById,
    deleteSmsNotes,
    DocType,
    Item,
    loadSmsNotes,
    resetActiveItem,
    selectActiveItem,
    selectSampleSmsNotes,
    selectSmsNoteById,
    setActiveItem,
    setDirtyItem,
} from 'state';
import { useAppDispatch, useAppSelector, useLocalStorage } from 'hooks/hooks';
import { AppProps, ToastControl } from 'App';

export interface MasterDetailProps extends AppProps, ToastControl {
    MasterType: any,
    masterProps: any,
    DetailType:  any,
    detailProps: any
    setSmsNotesStorage: React.Dispatch<React.SetStateAction<any>>,
    smsNotesStorage:any;
}

export const MasterDetail: React.FC<MasterDetailProps> = (props) => {  
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { confirm } = Modal;
    const printRef = React.useRef<HTMLInputElement | null>(null);
    const activeNote = useAppSelector(selectActiveItem());
    const {items, setSmsNotesStorage, smsNotesStorage, onNotify, onNotifySuccess, onNotifyError} = props;
    const { items: samples } = useAppSelector(selectSampleSmsNotes());
    const [smsNotes, setSmsNotes] = useState(smsNotesStorage);
    const [notesDeleted, setNotesDeleted] = useState(false);
    const [singleNoteDeleted, setSingleNoteDeleted] = useState(false);

    const [viewableSizeStorage, setViewableSizeStorage] = useLocalStorage("viewLimit",100);
    const [viewableSize, setViewableSize] = useState(viewableSizeStorage);
   
    useEffect(() => {
        setViewableSizeStorage(viewableSize);
     }, [setViewableSizeStorage, viewableSize]);

    const [searchText, setSearchText] = useState('');
    const [notesCount, setNotesCount] = useState(0);

    const {pathname} = useLocation();
    const id = getLastPathItem(pathname);
    const { item } = useAppSelector(selectSmsNoteById(id))
    
    useEffect(() => {
        if(item){
            dispatch(setActiveItem(item));
         }else{
            dispatch(resetActiveItem());
         }
    }, [item, dispatch]); 

    const handleInputSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchText(event.target.value);
        }
    const handleClearSearch = () =>  setSearchText('');

    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        const filter = smsNotes.filter(
            (item:Item) => (item.title?.toLowerCase().includes(searchText.toLowerCase()) 
            || item.note?.toLowerCase().includes(searchText.toLowerCase())));
        setNotesCount(filter.length);
        setFiltered(filter);
    }, [searchText, setSmsNotesStorage, smsNotes]); 

    const handleAddNote = (docType: DocType) => {
        const newNote: Item = {
            uuid: uuid(),
            title: `${DocType[docType]} Untitled Note`,
            note: "",
            lastModified: Date.now(),
            docType,
          };

        dispatch(addSmsNote(newNote));
        const dirtyItem = {} as Item;
        dispatch(setDirtyItem(dirtyItem));
        dispatch(setActiveItem(newNote));
        handleSaveNote(newNote);
    };

    const copyTocClipBoard = (copyItems:Item[])=>{
        navigator.clipboard.writeText(JSON.stringify(copyItems))
    }
    const onCopyNoteToClipBoard = () => {
        copyTocClipBoard([{...activeNote.item}]);
    }

    const onCopyNotesToClipBoard = () => {
        copyTocClipBoard(smsNotes);
    }
    
    const onImportSystemNotes = () => {
        saveImports(samples);
        onNotifySuccess('System notes imported');  
    }

    const deleteItems = (notes: Item[]) => {
        let smsNotesCopy = [...smsNotes];
        dispatch(resetActiveItem());

        notes.forEach((item: Item) => {
            dispatch(deleteSmsNoteById(item.uuid));
            smsNotesCopy = [...(smsNotesCopy.filter((note:Item) => note.uuid !== item.uuid))]
        });

        setSmsNotes(smsNotesCopy);
    }

    const onDeleteSystemNotes = () => {
        deleteItems(samples);
    }

    const handleSaveNote = (item: Item) => {
        let notes = smsNotes as Item[];
        const position = notes.findIndex(x => x.uuid === item.uuid);
        let updatedList: Item[];

        switch(position) {
            case -1:
                updatedList=[item, ...notes];
                setSmsNotes(updatedList);
              break;

            default:
                notes[notes.findIndex(x => x.uuid === item.uuid)] = item;
                updatedList=[...notes];
                setSmsNotes(updatedList);
          }
          dispatch(loadSmsNotes(updatedList));
          if(position === -1) {
            navigate(`/master/detail/${item.uuid}`);
          }
    }

    
    const onDeleteNotes = () => {
        confirm({
          title: `Are you sure DELETE all ${items?.length} Notes?`,
          icon: <ExclamationCircleOutlined />,
          content: 'This will permanently delete all notes and replace with defaults Notes',
          okText: 'Yes',
          okType: 'danger',
          cancelText: 'No',
      
          onOk() {
            dispatch(deleteSmsNotes());
            setSmsNotes([]);
            //deleteItems(smsNotes);
            setNotesDeleted(true);
          },
      
          onCancel() {
          },
        });
    }

    const handleDeleteNote = (uuid: string) => {
        confirm({
            title: 'Are you sure delete this Note?',
            icon: <ExclamationCircleOutlined />,
            content: 'This note will be permanently deleted',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
        
            onOk() {
                dispatch(deleteSmsNoteById(uuid));
                dispatch(resetActiveItem());
                const notes = smsNotes.filter((note:Item) => note.uuid !== uuid)
                setSmsNotes(notes);
                setSingleNoteDeleted(true);
            },
        
            onCancel() {
            },
        });
    }

    const saveImports = importNotes({ smsNotes, dispatch, setFiltered, setSmsNotes });
    
    const onImportFromClipBoard = () => {
        navigator.clipboard.readText().then((notes) => {
            const newItems: Item[] = JSON.parse(notes);
            saveImports(newItems);  
        }).catch((error)=>{
            console.log(error);
        });
     }

     const onImportFromFile = (newItems: Item[]) => {
        saveImports(newItems);
     }

     useEffect(() => {
        dispatch(loadSmsNotes(smsNotes));
        setSmsNotesStorage(smsNotes);
        if(notesDeleted && smsNotes.length === 0 ){
            setNotesDeleted(false);
            navigate(0);
        }
     }, [dispatch, navigate, notesDeleted, setSmsNotesStorage, smsNotes, singleNoteDeleted]);

    const onExportNotes = (title : string, isActiveNote:boolean=false) => { 
        const noteExport = isActiveNote ? [activeNote.item] : smsNotes;
        const fileData = JSON.stringify(noteExport);
        const blob = new Blob([fileData], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        if(title){
          link.download = getFileName(title,'json');
        }else{
          link.download = getFileName('notes-export','json');
        }
        link.href = url;
        link.click();
    }
    
     const liRefs  =  filtered.map(() => createRef<HTMLDivElement | null>());

    const master = (
        <props.MasterType {...props.masterProps}
            data-test="Master"
            smsNotes={smsNotes}
            setFiltered={setFiltered}
            setSmsNotes={setSmsNotes}
            filtered={filtered}
            handleAddNote={handleAddNote}
            handleSaveNote={handleSaveNote}
            onDeleteNotes={onDeleteNotes}
            handleDeleteNote={handleDeleteNote}
            handleInputSearch={handleInputSearch}
            setSearchText={setSearchText}
            handleClearSearch={handleClearSearch}
            notesCount={notesCount}
            onExportNotes={onExportNotes}
            onImportFromClipBoard={onImportFromClipBoard}
            onImportFromFile={onImportFromFile}
            onCopyNoteToClipBoard={onCopyNoteToClipBoard}
            onCopyNotesToClipBoard={onCopyNotesToClipBoard}
            printRef={printRef}
            setViewableSize={setViewableSize}
            viewableSize={viewableSize}
            onImportSystemNotes={onImportSystemNotes}
            onDeleteSystemNotes={onDeleteSystemNotes}
            singleNoteDeleted={singleNoteDeleted}
            setSingleNoteDeleted={setSingleNoteDeleted}
            refs={liRefs}
            onNotify={onNotify}
            onNotifySuccess={onNotifySuccess}
            onNotifyError={onNotifyError}
        />);
    const detail = (
        <props.DetailType {...props.detailProps} 
            data-test="Detail"
            smsNotes={smsNotes}
            setFiltered={setFiltered}
            setSmsNotes={setSmsNotes}
            filtered={filtered}
            handleAddNote={handleAddNote}
            handleSaveNote={handleSaveNote}
            onDeleteNotes={onDeleteNotes}
            handleDeleteNote={handleDeleteNote}
            handleInputSearch={handleInputSearch}
            handleClearSearch={handleClearSearch}
            notesCount={notesCount}
            onExportNotes={onExportNotes}
            onImportFromClipBoard={onImportFromClipBoard}
            onImportFromFile={onImportFromFile}
            onCopyNoteToClipBoard={onCopyNoteToClipBoard}
            onCopyNotesToClipBoard={onCopyNotesToClipBoard}
            printRef={printRef}
            setViewableSize={setViewableSize}
            onImportSystemNotes={onImportSystemNotes}
            onDeleteSystemNotes={onDeleteSystemNotes}
            singleNoteDeleted={singleNoteDeleted}
            setSingleNoteDeleted={setSingleNoteDeleted}
            refs={liRefs}
            setSearchText={setSearchText}
            onNotify={onNotify}
            onNotifySuccess={onNotifySuccess}
            onNotifyError={onNotifyError}
        />);

    return ( 
        <Media query={mediaQueries.md}>
            {matches =>
                matches ? (
                    <Routes>
                        <Route path="" element={master}/>
                        <Route path="/detail/:uuid" element={detail}/> 
                    </Routes>
                ) : (
                    <section className={styles.component}>
                        <section className={styles.master}>
                            {master}
                        </section>
                        <section className={styles.detail}>
                            <Routes>
                                <Route path="detail/:uuid" element={detail}/>
                            </Routes>
                        </section>
                    </section>
                    )
            }
        </Media>
    );
};

function importNotes(
    { smsNotes, dispatch, setFiltered, setSmsNotes }: { smsNotes: Item[]; dispatch: Dispatch<AnyAction>; setFiltered: React.Dispatch<React.SetStateAction<never[]>>; setSmsNotes: React.Dispatch<any>; }) {
        return (newItems: Item[]) => {
            const cleaned = [] as Item[];
            const dedupe = dedupeSmsNotes(newItems);
            smsNotes.forEach((note: Item) => {
                if (!dedupe.find((item: Item) => item.uuid === note.uuid)) {
                    cleaned.push(note);
                } else {
                    dispatch(deleteSmsNoteById(note.uuid));
                }
            });
    
            const notesToSave = dedupeSmsNotes([...dedupe, ...cleaned]) as any;
            setFiltered(notesToSave);
            setSmsNotes(notesToSave);
        };
    }


