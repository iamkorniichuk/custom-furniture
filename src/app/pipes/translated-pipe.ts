import { inject, Pipe, PipeTransform } from '@angular/core';
import { LanguageService } from '../services/language';

@Pipe({
  name: 'translated',
  pure: false,
})
export class TranslatedPipe implements PipeTransform {
  private languageService = inject(LanguageService);

  transform(obj: Record<string, unknown>, field: string): string {
    const lang = this.languageService.selectedLanguage().code;
    const key = `${field}_${lang}`;
    const value = obj[key];
    return String(value);
  }
}
