import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacy-policy-en',
  standalone: true,
  imports: [RouterLink, RouterModule],
  templateUrl: './privacy-policy-en.component.html',
  styleUrl: './privacy-policy-en.component.scss',
})
export class PrivacyPolicyEnComponent {
   constructor(private router: Router) {}

   goBack(): void {
    this.router.navigate(['/']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
