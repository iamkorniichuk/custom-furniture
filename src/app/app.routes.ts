import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home';
import { PortfolioComponent } from './pages/portfolio/portfolio';
import { NotFoundComponent } from './pages/not-found/not-found';

export const routes: Routes = [
  {
    path: ':language',
    children: [
      { path: '', component: HomeComponent },
      { path: 'portfolio', component: PortfolioComponent },
      { path: '**', component: NotFoundComponent },
    ],
  },
];
