import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import { Header, HeaderProps, Mermaid, NoteDeleted } from 'components';
import styles from './Detail.module.scss';
import { useLocation, useParams } from 'react-router-dom';
import { useAppSelector } from 'hooks/hooks';
import { DocType, selectActiveItem, selectSmsNoteById } from 'state';
import { UseRefType } from 'containers';
import { ToastControl } from 'App';
export interface DetailProps extends HeaderProps, NoteDeleted, UseRefType, ToastControl {
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
    refs,
    setSearchText,
    onNotify,
    onNotifySuccess,
    onNotifyError,
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
                textFieldId={''}
                setSearchText={setSearchText}
                onNotify={onNotify}
                onNotifySuccess={onNotifySuccess}
                onNotifyError={onNotifyError}
            />
            <main>
                <div ref={printRef} id="report-content" className={styles.content}>
                    <h1 className="preview-title">{title}</h1>
                    {
                        (item?.docType === DocType.Markdown) && (
                            <ReactMarkdown  remarkPlugins={[remarkGfm]}>
                                {body}
                            </ReactMarkdown>
                        )
                    }
                    {
                        (item?.docType === DocType.Mermaid) && (<Mermaid chart={body}></Mermaid>)
                    }
                </div>
            </main>
        </section>  
    );
};
