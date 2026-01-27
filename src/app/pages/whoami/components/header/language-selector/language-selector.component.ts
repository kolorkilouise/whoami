import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, Component, LOCALE_ID, inject, signal } from '@angular/core';
import { bootstrapChevronDown, bootstrapTranslate } from '@ng-icons/bootstrap-icons';
import { NgIcon, provideIcons } from '@ng-icons/core';

@Component({
  selector: 'app-language-selector',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgIcon],
  templateUrl: './language-selector.component.html',
  viewProviders: [provideIcons({ bootstrapTranslate, bootstrapChevronDown })],
  host: {
    class: 'block print:!hidden',
  },
})
export class LanguageSelectorComponent {
  private readonly document = inject(DOCUMENT);
  protected readonly currentLangId = inject(LOCALE_ID);

  protected readonly isOpen = signal(false);

  protected readonly languages = [
    { code: 'en', label: 'English', flag: '🇺🇸' },
    { code: 'pt', label: 'Português', flag: '🇧🇷' },
    { code: 'es', label: 'Español', flag: '🇪🇸' },
  ];

  protected toggle() {
    this.isOpen.update((v) => !v);
  }

  protected isCurrent(code: string) {
    return this.currentLangId.startsWith(code);
  }

  protected switchLanguage(lang: string) {
    if (this.isCurrent(lang)) {
      this.isOpen.set(false);
      return;
    }

    const currentUrl = new URL(this.document.location.href);
    const path = currentUrl.pathname;

    // GitHub Pages base: /whoami/
    const base = '/whoami/';

    let newPath = '';

    // Normalize path: ensure it doesn't end with a slash for easier logic, unless it's just /
    const normalizedPath = path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;

    if (normalizedPath === base || normalizedPath === base.slice(0, -1)) {
      // At root /whoami or /whoami/
      newPath = lang === 'en' ? base : `${base}${lang}/`;
    } else if (normalizedPath.startsWith(base)) {
      const subPath = normalizedPath.substring(base.length);
      const parts = subPath.split('/');
      const firstPart = parts[0];

      const knownLangs = ['pt', 'es', 'en'];
      if (knownLangs.includes(firstPart)) {
        if (lang === 'en') {
          // Go to root but keep the rest of the path if any
          newPath = base + parts.slice(1).join('/');
        } else {
          parts[0] = lang;
          newPath = base + parts.join('/') + '/';
        }
      } else {
        // We are at /whoami/something (implicitly en)
        if (lang === 'en') {
          newPath = normalizedPath;
        } else {
          newPath = base + lang + '/' + subPath + '/';
        }
      }
    } else {
      // Local dev usually / or /pt/
      const parts = normalizedPath.split('/').filter(Boolean);
      const knownLangs = ['pt', 'es', 'en'];

      if (parts.length > 0 && knownLangs.includes(parts[0])) {
        if (lang === 'en') {
          newPath = '/' + parts.slice(1).join('/');
        } else {
          parts[0] = lang;
          newPath = '/' + parts.join('/') + '/';
        }
      } else {
        if (lang === 'en') {
          newPath = normalizedPath;
        } else {
          newPath = '/' + lang + normalizedPath + (normalizedPath.endsWith('/') ? '' : '/');
        }
      }
    }

    // Clean up double slashes
    newPath = newPath.replace(/\/+/g, '/');

    // Set href to trigger reload with new localized bundle
    this.document.location.href = newPath;
  }
}
