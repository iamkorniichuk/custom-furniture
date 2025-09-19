import {
  Component,
  signal,
  inject,
  OnInit,
  ViewChild,
  ElementRef,
  PLATFORM_ID,
  AfterViewInit,
} from '@angular/core';
import {
  DatePipe,
  isPlatformBrowser,
  KeyValuePipe,
  NgClass,
} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {
  Firestore,
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
  where,
  QueryConstraint,
  DocumentData,
} from '@angular/fire/firestore';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

import { TranslatedPipe } from '../../pipes/translated-pipe';
import { Project, Room, RoomCode, roomOptions } from '../../shared/portfolio';
import { ArrowIconComponent } from '../../components/arrow-icon/arrow-icon';

@Component({
  selector: 'app-portfolio',
  imports: [
    TranslatedPipe,
    NgClass,
    ArrowIconComponent,
    InfiniteScrollDirective,
    KeyValuePipe,
    DatePipe,
  ],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class PortfolioComponent implements OnInit, AfterViewInit {
  private platformId = inject(PLATFORM_ID);

  @ViewChild('scrollElement') scroll!: ElementRef<HTMLDivElement>;
  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);
  private collectionReference = collection(this.firestore, 'projects');

  private pageSize = 10;
  private lastDocument: DocumentData | null = null;

  selectedRoom = signal<Room>(roomOptions[0]);
  currentIndexes = signal<Record<string, number>>({});
  imageLoaded = signal<Record<string, boolean[]>>({});
  projects = signal<Record<string, Project>>({});

  setImageLoad(projectIndex: string, imageIndex: number) {
    this.imageLoaded()[projectIndex][imageIndex] = true;
  }

  goToNext(projectIndex: string) {
    const project = this.projects()[projectIndex];
    this.currentIndexes()[projectIndex] =
      (this.currentIndexes()[projectIndex] + 1) % project.images.length;
  }

  goToPrevious(projectIndex: string) {
    const project = this.projects()[projectIndex];
    this.currentIndexes()[projectIndex] =
      (this.currentIndexes()[projectIndex] - 1 + project.images.length) %
      project.images.length;
  }

  async ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const code = params.get('room') as RoomCode | null;
      const room = roomOptions.find((r) => r.code === code) || roomOptions[0];
      this.selectedRoom.set(room);

      this.projects.set({});
      this.currentIndexes.set({});
      this.imageLoaded.set({});
      this.lastDocument = null;
      this.loadNextProjects();
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId))
      this.scroll.nativeElement.scrollTop = 0;
  }

  async loadNextProjects() {
    if (!isPlatformBrowser(this.platformId)) return;

    let q;
    const constraints: QueryConstraint[] = [orderBy('datetime', 'desc')];
    if (this.lastDocument) constraints.push(startAfter(this.lastDocument));
    constraints.push(limit(this.pageSize));

    if (this.selectedRoom().code) {
      q = query(
        this.collectionReference,
        where('room', '==', this.selectedRoom().code),
        ...constraints,
      );
    } else {
      q = query(this.collectionReference, ...constraints);
    }
    const nextDocuments = (await getDocs(q)).docs;

    const nextProjects: Record<string, Project> = {};
    const nextIndexes: Record<string, number> = {};
    const nextImageLoaded: Record<string, boolean[]> = {};
    for (const row of nextDocuments) {
      const data = row.data() as Project;
      const id = row.id;
      data['id'] = id;
      nextProjects[id] = data;
      nextIndexes[id] = 0;
      nextImageLoaded[id] = data.images.map(() => false);
    }

    this.projects.update((current) => ({ ...current, ...nextProjects }));
    this.currentIndexes.update((current) => ({ ...current, ...nextIndexes }));
    this.imageLoaded.update((current) => ({ ...current, ...nextImageLoaded }));

    this.lastDocument =
      nextDocuments[nextDocuments.length - 1] ?? this.lastDocument;
  }
}
