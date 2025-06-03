import { Component, Input, input } from '@angular/core';
import { Feedback } from '../my-feedbacks.component';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss'
})
export class FeedbackComponent {
  @Input() feedback!: Feedback;
}
