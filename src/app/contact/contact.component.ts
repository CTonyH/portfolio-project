import { NgIf, ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

let email: string;
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, NgIf, TranslateModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  email = 'tony.hirschligau@googlemail.com';
  isFocused: { [key: string]: boolean } = {};
  privacyAccepted: boolean = false;

  constructor(private viewportScroller: ViewportScroller) {}
  mailTest = false;
  http = inject(HttpClient);
  setAnchorTo(anchor: string): void {
    this.viewportScroller.scrollToAnchor(anchor);
  }

  contactData = {
    name: '',
    email: '',
    message: '',
  };

  post = {
    endPoint: './sendMailFallback.php', // Fallback-Version mit mehreren Optionen
    body: (payload: any) => JSON.stringify(payload),
    options: {
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };

  onSubmit(ngForm: NgForm) {
    if (ngForm.submitted && ngForm.form.valid) {
      // Daten direkt aus dem Form extrahieren
      const formData = {
        name: ngForm.form.get('name')?.value || '',
        email: ngForm.form.get('email')?.value || '',
        message: ngForm.form.get('message')?.value || '',
      };

      console.log('Form data to send:', formData);

      if (!this.mailTest) {
        this.http
          .post(this.post.endPoint, this.post.body(formData), this.post.options)
          .subscribe({
            next: (response) => {
              console.log('Email sent successfully:', response);
              ngForm.resetForm();
              this.contactData = { name: '', email: '', message: '' }; // Reset contactData
              // Hier könntest du eine Erfolgsmeldung anzeigen
            },
            error: (error) => {
              console.error('Error sending email:', error);
              // Hier könntest du eine Fehlermeldung anzeigen
            },
            complete: () => console.info('Email send request complete'),
          });
      } else {
        console.log('Test mode - Form data:', formData);
        ngForm.resetForm();
        this.contactData = { name: '', email: '', message: '' }; // Reset contactData
      }
    } else {
      console.log('Form is invalid or not submitted');
      console.log('Form valid:', ngForm.form.valid);
      console.log('Form submitted:', ngForm.submitted);
    }
  }
}
