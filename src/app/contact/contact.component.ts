import { NgIf, ViewportScroller } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

let email: string;
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule, NgIf, TranslateModule, RouterLink],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  showSuccessToast = false;
  email = 'tony.hirschligau@googlemail.com';
  isFocused: { [key: string]: boolean } = {};
  privacyAccepted: boolean = false;

  constructor(private viewportScroller: ViewportScroller, private translate: TranslateService, private router: Router) {
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(browserLang || 'de');
  }
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
      const formData = {
        name: ngForm.form.get('name')?.value || '',
        email: ngForm.form.get('email')?.value || '',
        message: ngForm.form.get('message')?.value || '',
      };

      const showToast = () => {
        this.showSuccessToast = true;
        setTimeout(() => {
          this.showSuccessToast = false;
        }, 3000);
      };

      if (!this.mailTest) {
        this.http
          .post(this.post.endPoint, this.post.body(formData), this.post.options)
          .subscribe({
            next: (response) => {
              ngForm.resetForm();
              this.contactData = { name: '', email: '', message: '' };
              showToast();
            },
            error: (error) => {
              console.error('Error sending email:', error);
            },
            complete: () => console.info('Email send request complete'),
          });
      } else {
        ngForm.resetForm();
        this.contactData = { name: '', email: '', message: '' };
        showToast();
      }
    }
  }

  getPrivacyPolicyRoute(): string {
    const currentLang =
      this.translate.currentLang || this.translate.defaultLang || 'en';
    return currentLang === 'de' ? '/privacy-policy-de' : '/privacy-policy-en';
  }

  onPrivacyPolicyClick(): void {
    const route = this.getPrivacyPolicyRoute();
    this.router.navigate([route]).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
