import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TranslatedPipe } from '../../pipes/translated-pipe';
import { portfolio, Room, RoomCode, roomOptions } from '../../shared/portfolio';

@Component({
  selector: 'app-portfolio',
  imports: [TranslatedPipe],
  templateUrl: './portfolio.html',
  styleUrl: './portfolio.css',
})
export class PortfolioComponent implements OnInit {
  private route = inject(ActivatedRoute);

  selectedRoom = signal<Room>(roomOptions[0]);

  projects = computed(() => {
    if (this.selectedRoom().code === null) return portfolio;
    return portfolio.filter((row) => row.room === this.selectedRoom().code);
  });

  ngOnInit() {
    this.route.queryParamMap.subscribe((params) => {
      const code = params.get('room') as RoomCode | null;
      const room = roomOptions.find((r) => r.code === code) || roomOptions[0];
      this.selectedRoom.set(room);
    });
  }
}
