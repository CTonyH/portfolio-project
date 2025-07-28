import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-legal-policy',
  imports: [TranslateModule, RouterModule, RouterLink],
  standalone: true,
  templateUrl: './legal-notice.component.html',
  styleUrl: './legal-notice.component.scss',
})
export class LegalNoticeComponent {
  constructor(private router: Router) {}
     goBack(): void {
    this.router.navigate(['/']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
