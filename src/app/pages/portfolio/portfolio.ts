import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { TranslatedPipe } from '../../pipes/translated-pipe';
import { portfolio, Room, RoomCode, roomOptions } from '../../shared/portfolio';
import { ArrowIconComponent } from '../../components/arrow-icon/arrow-icon';

@Component({
  selector: 'app-portfolio',
  imports: [TranslatedPipe, NgClass, ArrowIconComponent],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class PortfolioComponent implements OnInit {
  private route = inject(ActivatedRoute);

  selectedRoom = signal<Room>(roomOptions[0]);
  currentIndexes: number[] = [];
  imageLoaded: boolean[][] = [];

  projects = computed(() => {
    if (this.selectedRoom().code === null) return portfolio;
    return portfolio.filter((row) => row.room === this.selectedRoom().code);
  });

  constructor() {
    this.currentIndexes = this.projects().map(() => 0);
    this.imageLoaded = this.projects().map((row) =>
      row.images.map(() => false),
    );
  }

  setImageLoad(rowIndex: number, imageIndex: number) {
    this.imageLoaded[rowIndex][imageIndex] = true;
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
