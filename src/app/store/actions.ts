import { ContactParams } from "../models/contacts.interface";

export class CreateContact {
    static readonly type = '[Contact] Create';
    constructor(public payload: ContactParams) { }
}

export class EditContact {
    static readonly type = '[Contact] Edit';
    constructor(public payload: ContactParams, public id: number) { }
}

export class DeleteContact {
    static readonly type = '[Contact] Delete';
    constructor(public id: number) { }
}