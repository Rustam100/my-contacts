import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxsModule } from '@ngxs/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EditContactComponent } from './components/contacts/components/edit-contact/edit-contact.component';
import { CreateContactComponent } from './components/contacts/components/create-contact/create-contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactState } from './store/state';
import { environment } from 'src/environments/environment';


@NgModule({
  declarations: [
    AppComponent,
    CreateContactComponent,
    ContactsComponent,
    EditContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxsModule.forRoot([ContactState], {
      developmentMode: !environment.production
    }),
    FontAwesomeModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
