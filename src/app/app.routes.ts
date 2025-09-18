import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { PortfolioComponent } from './pages/portfolio/portfolio';
import { NotFoundComponent } from './pages/not-found/not-found';
import { ContactsComponent } from './pages/contacts/contacts';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: ':language',
        children: [
          { path: '', component: HomeComponent },
          { path: 'portfolio', component: PortfolioComponent },
          { path: 'contacts', component: ContactsComponent },
          { path: '**', component: NotFoundComponent },
        ],
      },
    ],
  },
];
