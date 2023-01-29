import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore} from "@angular/fire/compat/firestore";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm:FormGroup;
  formError:string;
  formSuccess:string;
  constructor(private fb: FormBuilder, private afs: AngularFirestore) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required,
          Validators.minLength(9),
          Validators.maxLength(15),
          Validators.pattern("^[+][0-8]*")]
      ],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  public onSubmit() {
    if (this.contactForm.valid) {
      const contact = {
        name: this.contactForm.value.name,
        email: this.contactForm.value.email,
        phone: this.contactForm.value.phone,
        message: this.contactForm.value.message,
        sendDate: new Date(),
      };
      this.afs.collection('contacts').add(contact);
      this.contactForm.reset();
      this.formSuccess = 'Votre message a été envoyé avec succès nous vous contacterons dès que possible.';
    } else {
      this.formError = 'Veuillez remplir tous les champs obligatoires.';
    }
  }


}
