import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

let email: string;

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  email = 'tony.hirschligau@googlemail.com'
  privacyAccepted: boolean = false;
  
  
}


