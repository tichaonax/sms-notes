import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item, Items, NoteState, RootState } from 'state';
import { loadNotes } from './loadNotes';

const initialState = new NoteState({},[]);

const smsNoteSlice = createSlice({
  name: 'smsNote',
  initialState,
  reducers: {
    loadSmsNotes(state, action: PayloadAction<Item[]>) {
      return loadNotes(action.payload, state);
    },

    // This just deletes the uuids node,
    deleteSmsNotes(state, action: PayloadAction) {
      return {
        ...state,
        uuids: state.uuids.filter(uuid => !uuid),
      }
    },

    addSmsNote(state, action: PayloadAction<Item>) {
      return loadNotes([action.payload], state);
    },

    deleteSmsNoteById(state, action: PayloadAction<string>) {
      let copyState = { ...state.items };
      delete copyState[action.payload];
      return {
        ...state,
        items: copyState,
        uuids: state.uuids.filter(uuid => uuid !== action.payload),
      }
      },
  },
});

export const { loadSmsNotes, addSmsNote, deleteSmsNotes, deleteSmsNoteById } = smsNoteSlice.actions;

export const selectUuids = () =>  (store: RootState): string [] => (store.smsNote.uuids);

export const selectSmsNotes = () => (store: RootState): Items =>
  ({ items: store.smsNote.uuids.map((uuid:string) => store.smsNote.items[uuid]) });

export const selectSmsNoteById = (uuid: string| undefined) => (state: RootState): { item: Item | null } => 
  ({ item : !!uuid ?  state.smsNote.items[uuid] : null });

export default smsNoteSlice.reducer;


