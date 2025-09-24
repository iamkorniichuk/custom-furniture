import {
  Component,
  inject,
  OnInit,
  ViewChild,
  ElementRef,
  PLATFORM_ID,
  AfterViewInit,
  signal,
} from '@angular/core';
import { isPlatformBrowser, NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { DocumentData } from '@angular/fire/firestore';

import { TranslatedPipe } from '../../pipes/translated-pipe';
import { Project, Room, RoomCode, roomOptions } from '../../shared/portfolio';
import { ImageCarouseComponent } from '../../components/image-carousel/image-carousel';
import { PortfolioService } from '../../services/portfolio';

@Component({
  selector: 'app-portfolio',
  imports: [
    TranslatedPipe,
    NgClass,
    InfiniteScrollDirective,
    ImageCarouseComponent,
  ],
  templateUrl: './portfolio.html',
  providers: [PortfolioService],
})
export class PortfolioComponent implements OnInit, AfterViewInit {
  private platformId = inject(PLATFORM_ID);

  @ViewChild('scrollElement') scroll!: ElementRef<HTMLDivElement>;
  private route = inject(ActivatedRoute);
  private portfolio = inject(PortfolioService);

  projects = signal<Project[]>([]);
  selectedRoom = signal<Room>(roomOptions[0]);
  lastDocument: DocumentData | null = null;

  async ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const code = params.get('room') as RoomCode | null;
      const room = roomOptions.find((r) => r.code === code) || roomOptions[0];

      this.selectedRoom.set(room);
      this.projects.set([]);
      this.loadProjects();
    });
  }

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId))
      this.scroll.nativeElement.scrollTop = 0;
  }

  async loadProjects() {
    const { results, lastDocument } = await this.portfolio.read(
      this.lastDocument,
      this.selectedRoom().code,
    );
    if (results) {
      this.lastDocument = lastDocument;
      this.projects.update((current) => current.concat(results));
    }
  }
}
