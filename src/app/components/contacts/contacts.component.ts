import { Component, OnInit } from '@angular/core';
import { faDeleteLeft, faEdit, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ContactParams } from 'src/app/models/contacts.interface';
import { DeleteContact } from 'src/app/store/actions';
import Swal from 'sweetalert2';
import { CreateContactComponent } from './components/create-contact/create-contact.component';
import { EditContactComponent } from './components/edit-contact/edit-contact.component';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss'],
  providers: [NgbModalConfig, NgbModal]
})
export class ContactsComponent implements OnInit {
  public faEdit: IconDefinition = faEdit;
  public faDeleteLeft: IconDefinition = faDeleteLeft;
  public contacts$: Observable<ContactParams[]>;

  constructor(
    public config: NgbModalConfig,
    private modalService: NgbModal,
    private store: Store
  ) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.contacts$ = this.store.select(state => {
      return state.contacts.contactList
    })
  }

  ngOnInit(): void {
  }

  openCreateContact() {
    this.modalService.open(CreateContactComponent, { size: 'xl' });
  }

  openEditContact(id: number) {
    const modalRef = this.modalService.open(EditContactComponent, { size: 'xl' });
    modalRef.componentInstance.id = id;
  }

  deleteContact(id: number) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {

      if (result.isConfirmed) {
        this.store.dispatch(new DeleteContact(id)).subscribe(() => {
          Swal.fire({
            icon: 'success',
            title: 'Your file has been deleted.',
          })
        })
      }

    })
  }
}
