import portfolioData from '../../assets/furnitures.json';

interface ImagePaths {
  original: string;
  medium: string;
  small: string;
}

interface Image {
  orientation: 'portrait' | 'landscape';
  paths: ImagePaths;
}

export type RoomCode =
  | 'kitchen'
  | 'kidroom'
  | 'guestroom'
  | 'bathroom'
  | 'bedroom'
  | 'business'
  | 'corridor';

export interface Room extends Record<string, unknown> {
  code: RoomCode | null;
  title_cs: string;
  title_de: string;
  title_en: string;
  title_pl: string;
  title_ua: string;
}

export interface Project extends Record<string, unknown> {
  title_cs: string;
  title_de: string;
  title_en: string;
  title_pl: string;
  title_ua: string;
  room: RoomCode;
  images: Image[];
}

export const roomOptions: Room[] = [
  {
    code: null,
    title_cs: 'Vše',
    title_de: 'Alle',
    title_en: 'All',
    title_pl: 'Wszystkie',
    title_ua: 'Всі',
  },
  {
    code: 'kitchen',
    title_cs: 'Kuchyně',
    title_de: 'Küche',
    title_en: 'Kitchen',
    title_pl: 'Kuchnia',
    title_ua: 'Кухня',
  },
  {
    code: 'kidroom',
    title_cs: 'Dětský pokoj',
    title_de: 'Kinderzimmer',
    title_en: 'Kid Room',
    title_pl: 'Pokój dziecięcy',
    title_ua: 'Дитяча',
  },
  {
    code: 'guestroom',
    title_cs: 'Pokoj pro hosty',
    title_de: 'Gästezimmer',
    title_en: 'Guest Room',
    title_pl: 'Pokój gościnny',
    title_ua: 'Гостьова',
  },
  {
    code: 'bathroom',
    title_cs: 'Koupelna',
    title_de: 'Badezimmer',
    title_en: 'Bathroom',
    title_pl: 'Łazienka',
    title_ua: 'Ванна',
  },
  {
    code: 'bedroom',
    title_cs: 'Ložnice',
    title_de: 'Schlafzimmer',
    title_en: 'Bedroom',
    title_pl: 'Sypialnia',
    title_ua: 'Спальня',
  },
  {
    code: 'business',
    title_cs: 'Obchod',
    title_de: 'Geschäft',
    title_en: 'Business',
    title_pl: 'Biznes',
    title_ua: 'Бізнес',
  },
  {
    code: 'corridor',
    title_cs: 'Chodba',
    title_de: 'Flur',
    title_en: 'Corridor',
    title_pl: 'Korytarz',
    title_ua: 'Коридор',
  },
];

export const portfolio: Project[] = portfolioData as Project[];
