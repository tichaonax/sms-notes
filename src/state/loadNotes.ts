import { WritableDraft } from 'immer/dist/internal';
import { Item, NoteState } from "./note.model";

export const loadNotes = (payload: Item[], state:WritableDraft<NoteState>) => {
    const notes: Item[] = payload;
    const items = {} as { [uuid: string]: Item; };
    notes.map((item: Item) => (items[item.uuid] = item));
    const newNotes = notes.map(item => (item.uuid));
    const oldNotes = state.uuids;
    return {
      ...state,
      items: { ...state.items, ...items },
      uuids: newNotes.concat(oldNotes.filter((note: string) => newNotes.indexOf(note) < 0)),
    };
  }