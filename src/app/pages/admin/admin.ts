import { DatePipe, NgClass } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';

import { PortfolioService } from '../../services/portfolio';
import { TranslatedPipe } from '../../pipes/translated-pipe';
import { Project, Room, roomOptions } from '../../shared/portfolio';

@Component({
  selector: 'app-admin',
  imports: [DatePipe, TranslatedPipe, NgClass],
  templateUrl: './admin.html',
})
export class AdminComponent implements OnInit {
  portfolio = inject(PortfolioService);
  projects = signal<Project[]>([]);
  lastDocument: DocumentData | null = null;

  private roomMap = Object.fromEntries(
    roomOptions.map((r) => [r.code ?? 'null', r]),
  ) as Record<string, Room>;

  async ngOnInit() {
    this.projects.set([]);
    this.loadProjects();
  }

  async loadProjects() {
    const { results, lastDocument } = await this.portfolio.read(
      this.lastDocument,
    );
    if (results) {
      this.lastDocument = lastDocument;
      this.projects.update((current) => current.concat(results));
    }
  }

  getRoom(project: Project): Room {
    return this.roomMap[project.room];
  }
}
