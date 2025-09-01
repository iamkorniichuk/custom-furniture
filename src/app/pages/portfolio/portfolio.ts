import { Component, signal, computed, effect, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

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

type RoomCode =
  | 'kitchen'
  | 'kidroom'
  | 'guestroom'
  | 'bathroom'
  | 'bedroom'
  | 'business'
  | 'corridor';

interface Room {
  code: RoomCode | null;
  title_en: string;
}

interface Project {
  title_cz: string;
  title_de: string;
  title_en: string;
  title_pl: string;
  title_ua: string;
  room: RoomCode;
  images: Image[];
}

@Component({
  selector: 'app-portfolio',
  imports: [NgClass],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class PortfolioComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private portfolio = portfolioData as Project[];
  rooms: Room[] = [
    { code: null, title_en: 'All' },
    { code: 'kitchen', title_en: 'Kitchen' },
    { code: 'kidroom', title_en: 'Kid Room' },
    { code: 'guestroom', title_en: 'Guest Room' },
    { code: 'bathroom', title_en: 'Bathroom' },
    { code: 'bedroom', title_en: 'Bedroom' },
    { code: 'business', title_en: 'Business' },
    { code: 'corridor', title_en: 'Corridor' },
  ];
  selectedRoom = signal<Room>(this.rooms[0]);

  constructor() {
    this.route.queryParamMap.subscribe((params) => {
      const code = params.get('room') as RoomCode | null;
      const room = this.rooms.find((r) => r.code === code) || this.rooms[0];
      this.selectedRoom.set(room);
    });

    effect(() => {
      const roomCode = this.selectedRoom().code;
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { room: roomCode },
        queryParamsHandling: 'merge',
      });
    });
  }

  projects = computed(() => {
    if (this.selectedRoom().code === null) return this.portfolio;
    return this.portfolio.filter(
      (row) => row.room === this.selectedRoom().code,
    );
  });

  setRoom(room: Room) {
    this.selectedRoom.set(room);
  }
}
