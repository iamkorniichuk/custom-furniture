import { Component, signal } from '@angular/core';

import portfolioData from '../../../assets/furnitures.json';

interface ImagePaths {
  large: string;
  medium: string;
  small: string;
}

interface Image {
  orientation: string;
  paths: ImagePaths;
}

interface Project {
  title_cz: string;
  title_de: string;
  title_en: string;
  title_pl: string;
  title_ua: string;
  images: Image[];
}

@Component({
  selector: 'app-portfolio',
  imports: [],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class PortfolioComponent {
  portfolio = signal<Project[]>(portfolioData);
}
