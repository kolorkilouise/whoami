import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { SkillsComponent } from './components/skills/skills.component';
import { SummaryComponent } from './components/summary/summary.component';

@Component({
  selector: 'app-whoami',
  imports: [
    CommonModule,
    HeaderComponent,
    SummaryComponent,
    ExperienceComponent,
    SkillsComponent,
    ProjectsComponent,
    EducationComponent,
    FooterComponent,
  ],
  templateUrl: './whoami.page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WhoamiPage {}
