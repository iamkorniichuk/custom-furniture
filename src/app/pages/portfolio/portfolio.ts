import { Component, signal, computed } from '@angular/core';
import { NgClass } from '@angular/common';

import portfolioData from '../../../assets/furnitures.json';

interface ImagePaths {
  large: string;
  medium: string;
  small: string;
}

interface Image {
  orientation: 'portrait' | 'landscape';
  paths: ImagePaths;
}

type Room =
  | 'kitchen'
  | 'kidroom'
  | 'guestroom'
  | 'bathroom'
  | 'bedroom'
  | 'business'
  | 'corridor';

interface Project {
  title_cz: string;
  title_de: string;
  title_en: string;
  title_pl: string;
  title_ua: string;
  room: Room;
  images: Image[];
}

@Component({
  selector: 'app-portfolio',
  imports: [NgClass],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class PortfolioComponent {
  private portfolio = portfolioData as Project[];
  selectedRoom = signal<Room | null>(null);
  roomOptions: Room[] = [
    'kitchen',
    'kidroom',
    'guestroom',
    'bathroom',
    'bedroom',
    'business',
    'corridor',
  ];

  projects = computed(() => {
    if (this.selectedRoom() === null) return this.portfolio;
    return this.portfolio.filter((row) => row.room === this.selectedRoom());
  });
}
