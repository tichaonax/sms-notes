import React from 'react';
import styles from './NotesCount.module.scss'

export interface NotesCountProps {
    notesCount: number,
  };

export const NotesCount = ( {notesCount}:NotesCountProps ) => {
	return (
		<div className={styles.count}>
			{notesCount}
		</div>
	);
};