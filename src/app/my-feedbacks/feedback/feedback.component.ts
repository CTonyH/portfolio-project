import { Component, Input, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { Feedback } from '../my-feedbacks.component';

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './feedback.component.html',
  styleUrl: './feedback.component.scss',
})
export class FeedbackComponent {
  @Input() feedback!: Feedback;
}
