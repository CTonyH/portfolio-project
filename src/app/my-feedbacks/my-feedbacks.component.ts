import { Component, HostListener } from '@angular/core';
import { FeedbackComponent } from './feedback/feedback.component';
import { TranslateModule } from '@ngx-translate/core';

export interface Feedback {
  name: string;
  project: string;
  singleFeedback: string;
  translationKey?: string; // Optional: für übersetzte Feedbacks
}

@Component({
  selector: 'app-my-feedbacks',
  standalone: true,
  imports: [FeedbackComponent, TranslateModule],
  templateUrl: './my-feedbacks.component.html',
  styleUrl: './my-feedbacks.component.scss',
})
export class MyFeedbacksComponent {
  feedbacks: Feedback[] = [
    {
      name: 'Joshua Plischek',
      project: 'JOIN',
      singleFeedback: 'Coming soon...',
      translationKey: 'my-feedbacks.feedback.coming-soon',
    },
    {
      name: 'Anne Dalchow',
      project: 'JOIN',
      singleFeedback:
        'Die Zusammenarbeit mit Tony im Rahmen des JOIN-Projekts war für mich in jeder Hinsicht bereichernd. Fachlich wie menschlich hat unsere Zusammenarbeit hervorragend harmoniert. Tony überzeugt durch einen ausgeprägten Teamgeist, eine ruhige, konzentrierte Arbeitsweise und eine klare, strukturierte Denkweise. Besonders geschätzt habe ich den fachlichen Austausch mit ihm. Man kann sich mit ihm sehr gut über technische Herausforderungen austauschen und gemeinsam durchdachte Lösungen erarbeiten. Ich habe mich in der Zusammenarbeit mit Tony immer wohl und gleichzeitig motiviert gefühlt und würde mich sehr freuen, wieder mit ihm zusammenzuarbeiten.',
      translationKey: 'my-feedbacks.feedback.anne-dalchow',
    },
    {
      name: 'Mirkan Polat',
      project: 'JOIN',
      singleFeedback: 'Coming soon...',
      translationKey: 'my-feedbacks.feedback.coming-soon',
    },
    {
      name: 'Ibrahim',
      project: 'Kochwelt',
      singleFeedback: 'Coming soon...',
      translationKey: 'my-feedbacks.feedback.coming-soon',
    },
    {
      name: 'Joshua Plischek',
      project: 'Kochwelt',
      singleFeedback: 'Coming soon...',
      translationKey: 'my-feedbacks.feedback.coming-soon',
    },
  ];

  isMobileText: boolean = false;

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobileText = window.innerWidth <= 812;
  }

  get isMobile() {
    return this.isMobileText;
  }
}
