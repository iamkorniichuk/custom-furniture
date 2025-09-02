import { Component, signal, computed, effect, inject } from '@angular/core';
import { NgClass } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import portfolioData from '../../../assets/furnitures.json';
import { TranslatedPipe } from '../../pipes/translated-pipe';

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

interface Room extends Record<string, unknown> {
  code: RoomCode | null;
  title_cz: string;
  title_de: string;
  title_en: string;
  title_pl: string;
  title_ua: string;
}

interface Project extends Record<string, unknown> {
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
  imports: [NgClass, TranslatedPipe],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class PortfolioComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  private portfolio = portfolioData as Project[];
  rooms: Room[] = [
    {
      code: null,
      title_cz: 'Vše',
      title_de: 'Alle',
      title_en: 'All',
      title_pl: 'Wszystkie',
      title_ua: 'Всі',
    },
    {
      code: 'kitchen',
      title_cz: 'Kuchyně',
      title_de: 'Küche',
      title_en: 'Kitchen',
      title_pl: 'Kuchnia',
      title_ua: 'Кухня',
    },
    {
      code: 'kidroom',
      title_cz: 'Dětský pokoj',
      title_de: 'Kinderzimmer',
      title_en: 'Kid Room',
      title_pl: 'Pokój dziecięcy',
      title_ua: 'Дитяча',
    },
    {
      code: 'guestroom',
      title_cz: 'Pokoj pro hosty',
      title_de: 'Gästezimmer',
      title_en: 'Guest Room',
      title_pl: 'Pokój gościnny',
      title_ua: 'Гостьова',
    },
    {
      code: 'bathroom',
      title_cz: 'Koupelna',
      title_de: 'Badezimmer',
      title_en: 'Bathroom',
      title_pl: 'Łazienka',
      title_ua: 'Ванна',
    },
    {
      code: 'bedroom',
      title_cz: 'Ložnice',
      title_de: 'Schlafzimmer',
      title_en: 'Bedroom',
      title_pl: 'Sypialnia',
      title_ua: 'Спальня',
    },
    {
      code: 'business',
      title_cz: 'Obchod',
      title_de: 'Geschäft',
      title_en: 'Business',
      title_pl: 'Biznes',
      title_ua: 'Бізнес',
    },
    {
      code: 'corridor',
      title_cz: 'Chodba',
      title_de: 'Flur',
      title_en: 'Corridor',
      title_pl: 'Korytarz',
      title_ua: 'Коридок',
    },
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
