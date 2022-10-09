import React from 'react';
import { useLocation } from 'react-router-dom';
import { Header, HeaderProps, ListItemLink, NoteDeleted, SEARCH_TEXT_FIELD_ID, UserControl } from 'components';
import { Item, selectSmsNoteById } from 'state';
import { useAppSelector } from 'hooks/hooks';
import { getLastPathItem } from 'utils';

export interface UseRefType {
    refs: React.RefObject<HTMLDivElement | null>[],
}
export interface MasterProps extends UserControl, HeaderProps, NoteDeleted, UseRefType {
    handleAddNote: () =>void,
    handleSaveNote: (item: Item) =>void,
    handleDeleteNote:(uuid: string) => void,
    handleInputSearch: (event: React.ChangeEvent<HTMLInputElement>) => void,
    handleClearSearch: () => void,
    searchText:string,
    printRef: React.MutableRefObject<HTMLInputElement | null>,
 }

export const MasterContainer: React.FC<MasterProps> = ({
    toggleTheme,
    smsNotes,
    handleAddNote,
    onDeleteNotes,
    handleDeleteNote,
    searchText,
    handleInputSearch,
    handleClearSearch,
    notesCount,
    onExportNotes,
    onImportFromClipBoard,
    onImportFromFile,
    onCopyNoteToClipBoard,
    onCopyNotesToClipBoard,
    setFiltered,
    setSearchText,
    setSmsNotes,
    onImportSystemNotes,
    onDeleteSystemNotes,
    activeNote,
    printRef,
    filtered,
    setViewableSize,
    viewableSize,
    body,
    singleNoteDeleted,
    setSingleNoteDeleted,
    refs,
    onNotify,
    onNotifySuccess,
    onNotifyError,
}) => {

     const {pathname} = useLocation();
     const id = getLastPathItem(pathname);
     const { item } = useAppSelector(selectSmsNoteById(id));

    const getReducedString = (note: Item): Item => {
        let copyItem = note as Item;
        return {...copyItem, note: copyItem.note?.substring(0, viewableSize || copyItem.note?.length)};
    }

    const listNotes = filtered.map((note: Item, index:number) =>
        <div key={note.uuid} ref={()=>refs[index].current}>
            <ListItemLink activeItem={note.uuid === item?.uuid && item!==undefined }
                to={`detail/${note.uuid}`} item={getReducedString(note)}
                liRef={refs[index]}
                index={index}
                onDeleteNote={()=>handleDeleteNote(note.uuid)}
                setSingleNoteDeleted={setSingleNoteDeleted} />
        </div>
    );

    return (
        <React.Fragment>
            <Header
                title="SMS Notes" 
                hideBackButton={true}
                notesCount={notesCount}
                handleChange={handleInputSearch}
                handleClearSearch={handleClearSearch}
                value={searchText}
                placeholder={'search...'}
                handleAddNote={handleAddNote}
                onImportFromClipBoard={onImportFromClipBoard}
                onImportFromFile={onImportFromFile}
                onCopyNoteToClipBoard={onCopyNoteToClipBoard}
                onCopyNotesToClipBoard={onCopyNotesToClipBoard}
                onExportNotes={onExportNotes}
                activeNote={activeNote}
                showSearch={true}
                printRef={printRef}
                onDeleteNotes={onDeleteNotes}
                toggleTheme={toggleTheme}
                smsNotes={smsNotes}
                filtered={filtered}
                setFiltered={setFiltered}
                setSmsNotes={setSmsNotes}
                onImportSystemNotes={onImportSystemNotes}
                onDeleteSystemNotes={onDeleteSystemNotes}
                setViewableSize={setViewableSize}
                viewableSize={viewableSize}
                body={body}
                singleNoteDeleted={singleNoteDeleted}
                setSingleNoteDeleted={setSingleNoteDeleted}
                refs={refs}
                textFieldId={SEARCH_TEXT_FIELD_ID}
                setSearchText={setSearchText}
                onNotify={onNotify}
                onNotifySuccess={onNotifySuccess}
                onNotifyError={onNotifyError}
            />
            <ul>
                {listNotes}
            </ul>
        </React.Fragment>
    );
};
