import { inject } from '@angular/core';
import { Auth, getIdTokenResult, onAuthStateChanged } from '@angular/fire/auth';
import { CanActivateFn } from '@angular/router';

import { LanguageService } from './language';

export const adminGuard: CanActivateFn = async () => {
  const auth = inject(Auth);
  const language = inject(LanguageService);

  return new Promise<boolean>((resolve) => {
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        language.navigateWithLanguage('login');
        resolve(false);
        return;
      }

      const token = await getIdTokenResult(user, true);
      if (token.claims['admin']) {
        resolve(true);
      } else {
        language.navigateWithLanguage('login');
        resolve(false);
      }
    });
  });
};
