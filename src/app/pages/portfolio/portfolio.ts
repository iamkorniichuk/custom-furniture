import {
  Component,
  signal,
  inject,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

import { TranslatedPipe } from '../../pipes/translated-pipe';
import {
  portfolio,
  Project,
  Room,
  RoomCode,
  roomOptions,
} from '../../shared/portfolio';
import { ArrowIconComponent } from '../../components/arrow-icon/arrow-icon';

@Component({
  selector: 'app-portfolio',
  imports: [
    TranslatedPipe,
    NgClass,
    ArrowIconComponent,
    InfiniteScrollDirective,
  ],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class PortfolioComponent implements OnInit {
  @ViewChild('scroll') scroll!: ElementRef<HTMLDivElement>;

  private pageSize = 10;
  private offset = 0;
  private route = inject(ActivatedRoute);

  selectedRoom = signal<Room>(roomOptions[0]);
  currentIndexes: Record<number, number> = {};
  imageLoaded: Record<number, boolean[]> = {};

  projects = signal<Project[]>([]);

  constructor() {
    for (const row of portfolio) {
      this.currentIndexes[row.id] = 0;
      this.imageLoaded[row.id] = row.images.map(() => false);
    }
  }

  setImageLoad(projectIndex: number, imageIndex: number) {
    this.imageLoaded[projectIndex][imageIndex] = true;
  }

  goToNext(projectIndex: number) {
    const project = this.projects()[projectIndex];
    this.currentIndexes[projectIndex] =
      (this.currentIndexes[projectIndex] + 1) % project.images.length;
  }

  goToPrevious(projectIndex: number) {
    const project = this.projects()[projectIndex];
    this.currentIndexes[projectIndex] =
      (this.currentIndexes[projectIndex] - 1 + project.images.length) %
      project.images.length;
  }

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const code = params.get('room') as RoomCode | null;
      const room = roomOptions.find((r) => r.code === code) || roomOptions[0];
      this.selectedRoom.set(room);

      this.offset = 0;
      this.projects.set([]);
      this.loadNextProjects();

      this.scroll.nativeElement.scrollTop = 0;
    });
  }

  loadNextProjects() {
    let selectedRoomPortfolio: Project[] = [];
    if (this.selectedRoom().code === null) selectedRoomPortfolio = portfolio;
    else {
      for (const row of portfolio) {
        if (row.room === this.selectedRoom().code) {
          selectedRoomPortfolio.push(row);
        }
      }
    }

    const nextBatch = selectedRoomPortfolio.slice(
      this.offset,
      this.offset + this.pageSize,
    );
    this.projects.update((current) => [...current, ...nextBatch]);

    this.offset += this.pageSize;
  }
}
