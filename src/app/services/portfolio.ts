import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  collection,
  DocumentData,
  Firestore,
  getDocs,
  limit,
  orderBy,
  OrderByDirection,
  query,
  QueryConstraint,
  startAfter,
  where,
} from '@angular/fire/firestore';
import { isPlatformBrowser } from '@angular/common';

import { Project, RoomCode } from '../shared/portfolio';

@Injectable({
  providedIn: 'root',
})
export class PortfolioService {
  private platformId = inject(PLATFORM_ID);
  private firestore = inject(Firestore);
  private collectionReference = collection(this.firestore, 'projects');

  private PAGE_SIZE = 10;

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

    let q;
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
