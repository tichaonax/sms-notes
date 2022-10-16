export class NoteState {
    constructor(
        public items: { [uuid:string]: Item },
        public uuids: string[] = [],
    ) {}
}

export class Items {
    public items: Item[] = [];
}

export interface Item {
    uuid: string;
    title: string;
    note: string;
    docType: DocType;
    lastModified: number;
}

export enum DocType {
    Markdown,
    Mermaid,
  }