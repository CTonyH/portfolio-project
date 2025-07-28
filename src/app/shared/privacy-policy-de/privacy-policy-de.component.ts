import { Component } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-privacy-policy-de',
  standalone: true,
  imports: [RouterModule, RouterLink],
  templateUrl: './privacy-policy-de.component.html',
  styleUrl: './privacy-policy-de.component.scss',
})
export class PrivacyPolicyDeComponent {
  constructor(private router: Router) {}

     goBack(): void {
    this.router.navigate(['/']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
