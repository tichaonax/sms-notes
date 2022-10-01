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
    [x: string]: any;
    uuid: string
    title: string;
    note: string;
    lastModified: number;
}