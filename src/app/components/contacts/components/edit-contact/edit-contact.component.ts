import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ContactParams } from 'src/app/models/contacts.interface';
import { EditContact } from 'src/app/store/actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {
  @Input() private id: number = -1;
  public editContactForm: FormGroup;
  public contacts$: Observable<ContactParams[]>;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    public activeModal: NgbActiveModal
  ) {
    this.contacts$ = this.store.select(state => {
      return state.contacts.contactList
    })

    this.editContactForm = formBuilder.group({
      "name": ["", [Validators.required]],
      "surname": ["", [Validators.required]],
      "email": ["", [Validators.required, Validators.email]],
      "phoneNumber": ["", [Validators.required]],
      "sex": ["", [Validators.required]]
    })
  }

  ngOnInit(): void {
    this.contacts$.subscribe((data: ContactParams[]) => {
      if (data && this.id !== -1) {
        this.editContactForm.setValue(data[this.id]);
      }
    })
  }

  editContact() {
    this.store.dispatch(new EditContact(this.editContactForm.value, this.id)).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Your data has been edited.',
      })
    });

    this.id = -1;
  }
}
