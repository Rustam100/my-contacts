import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { CreateContact } from 'src/app/store/actions';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-contact',
  templateUrl: './create-contact.component.html',
  styleUrls: ['./create-contact.component.scss']
})
export class CreateContactComponent implements OnInit {
  public createContactForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    public activeModal: NgbActiveModal
  ) {
    this.createContactForm = formBuilder.group({
      "name": ["", [Validators.required]],
      "surname": ["", [Validators.required]],
      "email": ["", [Validators.required, Validators.email]],
      "phoneNumber": ["", [Validators.required]],
      "sex": ["", [Validators.required]]
    })
  }

  ngOnInit(): void {
  }

  createContact() {
    this.store.dispatch(new CreateContact(this.createContactForm.value)).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Your data has been created.',
      })
    });
  }

}
