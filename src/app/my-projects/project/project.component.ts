import { Component, Input } from '@angular/core';
import { Project } from '../my-projects.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss',
})
export class ProjectComponent {
  @Input() project!: Project;

  goToGitHub(projectName: string): void {
    if (projectName === 'JOIN') {
      window.open('https://github.com/CTonyH/join.git', '_blank');
    } else if (projectName === 'El-Pollo-Loco') {
      window.open('https://github.com/CTonyH/el-pollo-loco.git', '_blank');
    }
  }

  goToLiveDemo(projectName: string): void {
    if (projectName === 'JOIN') {
      window.open('https://join.tony-hirschligau.de', '_blank');
    } else if (projectName === 'El-Pollo-Loco') {
      window.open('https://el-pollo-loco.tony-hirschligau.de/', '_blank');
    }
  }
}
