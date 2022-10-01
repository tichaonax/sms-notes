import React from 'react';
import { AddNote, AddNoteProps, NotesCount, TextInput, TextInputProps, PopupMenu, PopupMenuProps, NotesCountProps } from 'components';
import { MdSearch, MdClear } from 'react-icons/md';
import styles from './Search.module.scss';

export interface SearchProps extends TextInputProps, AddNoteProps, PopupMenuProps, NotesCountProps {
    handleClearSearch: () => void,
}
export const Search = ({
    handleChange,
    value,
    handleClearSearch,
    placeholder,
    handleAddNote,
    onExportNotes,
    onDeleteNotes,
    onCopyNoteToClipBoard,
    onCopyNotesToClipBoard,
    onImportFromClipBoard,
    onImportFromFile,
    notesCount,
    activeNote,
    onImportSystemNotes,
    onDeleteSystemNotes,
} : SearchProps ) => {

	return (
		<div className={styles.box}>
            <NotesCount notesCount={notesCount}/>
            <AddNote handleAddNote={handleAddNote}/>
            <div className="menu-item">
                <PopupMenu 
                onExportNotes={onExportNotes}
                onDeleteNotes={onDeleteNotes}
                onCopyNoteToClipBoard={onCopyNoteToClipBoard}
                onCopyNotesToClipBoard={onCopyNotesToClipBoard}
                onImportFromClipBoard={onImportFromClipBoard}
                onImportFromFile={onImportFromFile}
                handleAddNote={handleAddNote}
                activeNote={activeNote}
                onImportSystemNotes={onImportSystemNotes}
                onDeleteSystemNotes={onDeleteSystemNotes}
                />
            </div>
			<div className={styles.search}>
                <MdClear cursor={"pointer"}  className='search-icons' onClick={()=>{handleClearSearch()}}/>
				<MdSearch className='search-icons'/>
                <TextInput 
                    handleChange={handleChange}
                    placeholder={placeholder}
                    value={value}
                />
			</div>
		</div>
	);
};