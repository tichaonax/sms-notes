import { ThunkAction, Action } from '@reduxjs/toolkit';
import { combineReducers, createStore } from 'redux';
import { NoteState } from './note.model';
import { composeWithDevTools } from 'redux-devtools-extension';
import activeNote from './activeNoteSlice';
import smsNote from './smsNoteSlice';
import sampleNote from './system/sampleSmsNoteSlice';

export interface AppStore {
    sampleNote: NoteState,
    smsNote: NoteState,
}

export const store = createStore(
    combineReducers({ 
        //sampleNote:note,
        sampleNote,
        activeNote,
        smsNote,
    }),
    composeWithDevTools() 
);


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;