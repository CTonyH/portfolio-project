import { Component } from '@angular/core';
import { FeedbackComponent } from './feedback/feedback.component';

export interface Feedback {
  name: string;
  project: string;
  singleFeedback: string;
}

@Component({
  selector: 'app-my-feedbacks',
  standalone: true,
  imports: [FeedbackComponent],
  templateUrl: './my-feedbacks.component.html',
  styleUrl: './my-feedbacks.component.scss'
})
export class MyFeedbacksComponent {
  feedbacks: Feedback[] = [
    {
      name: 'Pepe',
      project: 'Project Pollo Loco',
      singleFeedback: 'Hot Sauce tastes good! Best hot sauce in town.'
    },
    {
      name: 'Schwiegermutter',
      project: 'Kochwelt',
      singleFeedback: 'Kann gut kochen. Kaffee schmeckt. Wohnung immer sauber!'
    }
  ]
}
