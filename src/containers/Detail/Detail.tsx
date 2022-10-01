import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Header, HeaderProps, Mermaid, NoteDeleted } from 'components';
import { matchMermaidGraph } from "../../utils/matchMermaidGraph";
import styles from './Detail.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import { useAppSelector } from 'hooks/hooks';
import { selectActiveItem, selectSmsNoteById } from 'state';
import { UseRefType } from 'containers';

export interface DetailProps extends HeaderProps, NoteDeleted, UseRefType {
}

const removeGraph = (note: string) => {
    if(!note) return '';
    const position = matchMermaidGraph(note);
    return position === -1 ? note.substring(position) : note.substring(0, position);
  }
  
export const DetailContainer: React.FC<DetailProps> = ({
    handleClearSearch,
    handleChange,
    value,
    placeholder,
    handleAddNote,
    onImportFromClipBoard,
    onImportFromFile,
    onCopyNoteToClipBoard,
    onCopyNotesToClipBoard,
    onExportNotes,
    notesCount,
    onDeleteNotes,
    toggleTheme,
    smsNotes,
    setFiltered,
    setSmsNotes,
    onImportSystemNotes,
    onDeleteSystemNotes,
    setViewableSize,
    viewableSize,
    filtered,
    singleNoteDeleted,
    setSingleNoteDeleted,
    refs
}) => {
    const printRef = React.useRef<HTMLInputElement | null>(null);
    const { uuid } = useParams<{ uuid?:string }>();
    const activeNote = useAppSelector(selectActiveItem());
    const  fetchedNote  = useAppSelector(selectSmsNoteById(uuid));
    const item = activeNote.item || fetchedNote.item;
    const headerTitle = (item && !singleNoteDeleted) ? item?.title : 'Detail';
    const title = (item && !singleNoteDeleted) ? item.title : 'Nothing Selected';
    const body = (item && !singleNoteDeleted) ? item?.note : 'Detail Page';

    const location = useLocation();
    const {state} = location;

    return (
        <section className={styles.component}>

            <Header
                title={headerTitle}
                showPdfExport={true}
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
                notesCount={notesCount}
                handleChange={handleChange}
                printRef={printRef}
                showEditNote={true}
                showHeader={false}
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
            />
            <main>
                <div ref={printRef} id="report-content" className={styles.content}>
                    <h1 className="preview-title">{title}</h1>
                    <ReactMarkdown>
                        {removeGraph(body)}
                    </ReactMarkdown>
                    <Mermaid chart={body}></Mermaid>
                </div>
            </main>
        </section>  
    );
};
