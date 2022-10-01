import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import { Item } from './note.model'

export interface ActiveNoteState {
  item: Item,
  dirtyItem: Item,
}

const initialState = { } as ActiveNoteState

const activeNoteStateSlice = createSlice({
  name: 'activeNote',
  initialState,
  reducers: {
    setActiveItem(state, action: PayloadAction<Item>) {
      state.item = action.payload
    },
    setDirtyItem(state, action: PayloadAction<Item>) {
      state.dirtyItem = action.payload
    },
    resetActiveItem(state, action: PayloadAction) {
      return(initialState)
    },
  },
})

export const selectActiveItem = () => (state: RootState): { item: Item, dirtyItem: Item} => (state.activeNote);

export const {  setActiveItem, setDirtyItem, resetActiveItem } = activeNoteStateSlice.actions

export default activeNoteStateSlice.reducer