import { Component } from '@angular/core';
import {
  bootstrapBrush,
  bootstrapCamera,
  bootstrapFileEarmarkText,
  bootstrapGraphUpArrow,
  bootstrapImages,
  bootstrapLightningCharge,
  bootstrapPalette2,
} from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-projects',
  imports: [NgIcon],
  templateUrl: './projects.component.html',
  host: { class: 'block' },
  viewProviders: [
    provideIcons({
      bootstrapLightningCharge,
      bootstrapImages,
      bootstrapBrush,
      bootstrapPalette2,
      bootstrapCamera,
      bootstrapFileEarmarkText,
      bootstrapGraphUpArrow,
    }),
  ],
})
export class ProjectsComponent {}
