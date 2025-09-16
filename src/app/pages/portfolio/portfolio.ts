import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { KeyValuePipe, NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

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
  imports: [TranslatedPipe, NgClass, ArrowIconComponent, KeyValuePipe],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class PortfolioComponent implements OnInit {
  private route = inject(ActivatedRoute);

  selectedRoom = signal<Room>(roomOptions[0]);
  currentIndexes: Record<number, number> = {};
  imageLoaded: Record<number, boolean[]> = {};

  projects = computed(() => {
    if (this.selectedRoom().code === null) return portfolio;

    const result: Record<number, Project> = {};
    for (const row of Object.values(portfolio)) {
      if (
        this.selectedRoom().code === null ||
        row.room === this.selectedRoom().code
      ) {
        result[row.id] = row;
      }
    }
    return result;
  });

  constructor() {
    for (const row of Object.values(portfolio)) {
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
    });
  }
}
