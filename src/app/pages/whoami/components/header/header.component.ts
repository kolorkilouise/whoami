import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  bootstrapEnvelope,
  bootstrapGeoAlt,
  bootstrapGithub,
  bootstrapGlobe,
  bootstrapLinkedin,
  bootstrapTelephone,
} from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';

import { LanguageSelectorComponent } from './language-selector/language-selector.component';

@Component({
  selector: 'app-header',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon, LanguageSelectorComponent],
  templateUrl: './header.component.html',
  host: { class: 'block' },
  viewProviders: [
    provideIcons({
      bootstrapGeoAlt,
      bootstrapEnvelope,
      bootstrapTelephone,
      bootstrapLinkedin,
      bootstrapGithub,
      bootstrapGlobe,
    }),
  ],
})
export class HeaderComponent {}
