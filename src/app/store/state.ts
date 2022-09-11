import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { Contacts } from '../models/contacts.interface';
import { CreateContact, DeleteContact, EditContact } from './actions';

@State<Contacts>({
  name: 'contacts',
  defaults: {
    contactList: [
      {
        name: "Ivan",
        surname: "Ivanov",
        email: "ivan@mail.ru",
        phoneNumber: "+992985272236",
        sex: "male"
      },
      {
        name: "Nina",
        surname: "Ivanova",
        email: "nina@mail.ru",
        phoneNumber: "+992885555555",
        sex: "female"
      },
      {
        name: "Anna",
        surname: "Denisovna",
        email: "anna@mail.ru",
        phoneNumber: "+992985653844",
        sex: "female"
      },
    ]
  }
})

@Injectable()
export class ContactState {

  @Action(CreateContact)
  createContact(ctx: StateContext<Contacts>, action: CreateContact) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      contactList: [...state.contactList, action.payload]
    });
  }

  @Action(DeleteContact)
  deleteContact(ctx: StateContext<Contacts>, action: DeleteContact) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      contactList: state.contactList.filter((contactItem, index) => {
        return index !== action.id
      })
    });
  }

  @Action(EditContact)
  editContact(ctx: StateContext<Contacts>, action: EditContact) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      contactList: state.contactList.map((element, index) => {
        if (index === action.id) {
          element = action.payload
        }

        return element;
      })
    });
  }

}