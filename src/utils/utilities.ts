import { Item } from "state";

export const getLastPathItem = (path: string) => path.substring(path.lastIndexOf('/') + 1);

export const getFileName = (header : string, fileType : string) => (`${header}-${(new Date()).toISOString().replace(/:/g, '-')}.${fileType}`);

export const formatTitle = (title: string, header : string) => (`${header}${title.replace(/ /g, '-').toLowerCase()}`);

export const dedupeSmsNotes = (notes: Item[]) => { 
    const cleaned = [] as Item[];
    notes.forEach((note) => {
        if(!cleaned.find((item:Item) => item.uuid === note.uuid))
        {
            cleaned.push(note);
        }else{
            console.log('dupe', note.uuid);
        } 
    });

    return cleaned;
}
