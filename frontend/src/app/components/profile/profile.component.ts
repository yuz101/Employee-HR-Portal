import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  form = new FormBuilder().group({
    firstname: '',
    middlename: '',
    lastname: '',
    email: '',
    streetaddress: '',
    city: '',
    state: '',
    zipcode: '',
  });

  onBasicUpload(event) {
    console.log(event);
  }
}
