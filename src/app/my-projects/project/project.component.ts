import { Component, Input } from '@angular/core';
import { Project } from '../my-projects.component';



@Component({
  selector: 'app-project',
  standalone: true,
  imports: [],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent {
  @Input() project!: Project;
}
