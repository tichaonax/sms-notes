import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item, Items, NoteState, RootState } from 'state';
import { loadNotes } from 'state/loadNotes';

const initialState = new NoteState({},[]);

const sampleSmsNoteSlice = createSlice({
  name: 'smsNote',
  initialState,
  reducers: {
    loadSampleSmsNotes(state, action: PayloadAction<Item[]>) {
      return loadNotes(action.payload, state);
    },

    addSampleSmsNote(state, action: PayloadAction<Item>) {
      return loadNotes([action.payload], state);
    },
  },
});

export const { loadSampleSmsNotes, addSampleSmsNote } = sampleSmsNoteSlice.actions;

export const selectSampleUuids = () =>  (store: RootState): string [] => (store.sampleNote.uuids);

export const selectSampleSmsNotes = () => (store: RootState): Items =>
  ({ items: store.sampleNote.uuids.map((uuid:string) => store.sampleNote.items[uuid]) });

export const selectSampleSmsNoteById = (uuid: string| undefined) => (state: RootState): { item: Item | null } => 
  ({ item : !!uuid ?  state.sampleNote.items[uuid] : null });

export default sampleSmsNoteSlice.reducer;


