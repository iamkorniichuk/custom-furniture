import { v4 as uuidv4 } from 'uuid';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  addDoc,
  collection,
  DocumentData,
  Firestore,
  getDocs,
  limit,
  orderBy,
  OrderByDirection,
  Query,
  query,
  QueryConstraint,
  startAfter,
  Timestamp,
  where,
} from '@angular/fire/firestore';
import {
  getDownloadURL,
  ref,
  Storage,
  uploadBytes,
  UploadMetadata,
} from '@angular/fire/storage';
import { isPlatformBrowser } from '@angular/common';

import { Project, RoomCode } from '../shared/portfolio';
import { ResponsiveImage } from '../shared/images';

type Prefixed<T, Prefix extends string> = {
  [K in keyof T as `${Prefix}${Extract<K, string>}`]: T[K];
};
export interface Translations extends Record<string, string> {
  cs: string;
  de: string;
  en: string;
  pl: string;
  ua: string;
}
export interface InputProject extends Record<string, unknown> {
  title_cs: string;
  title_de: string;
  title_en: string;
  title_pl: string;
  title_ua: string;
  description_cs: string;
  description_de: string;
  description_en: string;
  description_pl: string;
  description_ua: string;
  datetime: Timestamp;
  room: RoomCode;
  images: ResponsiveImage[];
}

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private platformId = inject(PLATFORM_ID);
  private firestore = inject(Firestore);
  private storage = inject(Storage);
  private collectionReference = collection(this.firestore, 'projects');

  private PAGE_SIZE = 10;

  async uploadImage(
    blob: Blob,
    name: string,
    isPublic = false,
  ): Promise<string> {
    const metadata: UploadMetadata = {
      cacheControl: 'public,max-age=7776000,immutable',
    };
    const storageReference = ref(this.storage, name);

    await uploadBytes(storageReference, blob, metadata);
    const tokenUrl = await getDownloadURL(storageReference);
    if (!isPublic) return tokenUrl;

    const queryIndex = tokenUrl.lastIndexOf('?');
    const url = tokenUrl.slice(0, queryIndex);
    return url + '?alt=media';
  }

  async create(
    title: Translations,
    description: Translations,
    images: ResponsiveImage[],
    room: RoomCode,
    datetime: Timestamp | null = null,
  ) {
    if (!datetime) datetime = Timestamp.fromDate(new Date());

    const id = uuidv4();
    const titleMap = this.translationsToMap(title, 'title_');
    const descriptionMap = this.translationsToMap(description, 'description_');
    const project: InputProject = {
      id,
      ...titleMap,
      ...descriptionMap,
      images,
      room,
      datetime,
    };
    return await addDoc(this.collectionReference, project);
  }

  private translationsToMap<Prefix extends string>(
    translations: Translations,
    prefix: Prefix,
  ): Prefixed<Translations, Prefix> {
    return Object.entries(translations).reduce(
      (acc, [key, value]) => {
        const prefixedKey = `${prefix}${key as string}` as keyof Prefixed<
          Translations,
          Prefix
        >;
        acc[prefixedKey] = value as Prefixed<
          Translations,
          Prefix
        >[typeof prefixedKey];
        return acc;
      },
      {} as Prefixed<Translations, Prefix>,
    );
  }

  async read(
    lastDocument: DocumentData | null = null,
    selectedRoomCode: RoomCode | null = null,
    orderField = 'datetime',
    orderDirection: OrderByDirection = 'desc',
  ) {
    if (!isPlatformBrowser(this.platformId))
      return { results: null, lastDocument: null };

    const constraints: QueryConstraint[] = [
      orderBy(orderField, orderDirection),
    ];
    if (lastDocument) constraints.push(startAfter(lastDocument));
    constraints.push(limit(this.PAGE_SIZE));

    let q: Query<DocumentData, DocumentData>;
    if (selectedRoomCode) {
      q = query(
        this.collectionReference,
        where('room', '==', selectedRoomCode),
        ...constraints,
      );
    } else {
      q = query(this.collectionReference, ...constraints);
    }

    const docs = (await getDocs(q)).docs;
    lastDocument = docs[docs.length - 1];

    const results: Project[] = [];
    for (const row of docs) {
      const data = row.data() as Project;
      results.push(data);
    }
    return { results, lastDocument };
  }
}
