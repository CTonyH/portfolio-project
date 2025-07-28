import { Component, OnInit, OnDestroy } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  imports: [TranslateModule, RouterModule],
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit, OnDestroy {
  email: string = 'tony.hirschligau@googlemail.com';
  private langChangeSubscription?: Subscription;

  constructor(private translate: TranslateService, private router: Router) {}

  ngOnInit(): void {
    this.langChangeSubscription = this.translate.onLangChange.subscribe(
      (event) => {
        const currentUrl = this.router.url;
        if (currentUrl.includes('privacy-policy')) {
          const newRoute =
            event.lang === 'de' ? '/privacy-policy-de' : '/privacy-policy-en';
          this.router.navigate([newRoute]);
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.langChangeSubscription) {
      this.langChangeSubscription.unsubscribe();
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

  onLegalNoticeClick(): void {
    this.router.navigate(['/legal-notice']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  goToWebsite(siteName: string): void {
    if (siteName === 'gitHub') {
      window.open('https://github.com/CTonyH', '_blank');
    } else if (siteName === 'linkedIn') {
      window.open('https://www.linkedin.com/in/tony-hirschligau/', '_blank');
    }
  }
}
