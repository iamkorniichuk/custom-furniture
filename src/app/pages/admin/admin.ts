import { DatePipe, isPlatformBrowser, NgClass } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslatePipe } from '@ngx-translate/core';

import { PortfolioService, Translations } from '../../services/portfolio';
import { TranslatedPipe } from '../../pipes/translated-pipe';
import {
  Project,
  Room,
  RoomCode,
  selectRoomOptions,
} from '../../shared/portfolio';
import { AVAILABLE_LANGUAGES } from '../../services/language';
import { ImageFormat, ResponsiveImage } from '../../shared/images';
import { ImageProcessorService } from '../../services/image-processor';

@Component({
  selector: 'app-admin',
  imports: [
    DatePipe,
    TranslatedPipe,
    TranslatePipe,
    NgClass,
    ReactiveFormsModule,
  ],
  templateUrl: './admin.html',
})
export class AdminComponent implements OnInit {
  portfolio = inject(PortfolioService);
  imageProcessor = inject(ImageProcessorService);
  private platformId = inject(PLATFORM_ID);
  projects = signal<Project[]>([]);
  lastDocument: DocumentData | null = null;
  isLoading = signal<boolean>(false);
  selectRoomOptions = selectRoomOptions;
  availableLanguages = Object.values(AVAILABLE_LANGUAGES);
  selectedFiles: File[] = [];

  private formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    title: this.formBuilder.group({
      cs: this.formBuilder.control('', Validators.required),
      de: this.formBuilder.control('', Validators.required),
      en: this.formBuilder.control('', Validators.required),
      pl: this.formBuilder.control('', Validators.required),
      ua: this.formBuilder.control('', Validators.required),
    }),
    description: this.formBuilder.group({
      cs: this.formBuilder.control('', Validators.required),
      de: this.formBuilder.control('', Validators.required),
      en: this.formBuilder.control('', Validators.required),
      pl: this.formBuilder.control('', Validators.required),
      ua: this.formBuilder.control('', Validators.required),
    }),
    room: this.formBuilder.control('', Validators.required),
    images: this.formBuilder.control<File[]>([], [Validators.minLength(1)]),
  });

  get titles() {
    return this.form.get('title');
  }

  get descriptions() {
    return this.form.get('description');
  }

  get room() {
    return this.form.get('room');
  }

  get images() {
    return this.form.get('images');
  }

  private roomMap = Object.fromEntries(
    selectRoomOptions.map((r) => [r.code, r]),
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

  onFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.selectedFiles = Array.from(input.files);
    }
  }

  async createProject() {
    if (!isPlatformBrowser(this.platformId)) return;
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { title, description, room } = this.form.value;
    const files = this.selectedFiles;
    if (!title || !description || !room || !files) return;

    this.isLoading.set(true);

    const responsiveImages: ResponsiveImage[] = [];

    for (const file of files) {
      const processed = await this.imageProcessor.process(file);
      const results: ResponsiveImage = {
        paths: {
          'image/avif': [],
          'image/webp': [],
        },
        width: processed.width,
        height: processed.height,
      };

      for (const key in processed.images) {
        const format = key as ImageFormat;

        for (const image of processed.images[format]) {
          const name = 'furnitures/' + image.name;
          const src = await this.portfolio.uploadImage(image.blob, name, true);
          const obj = { src, width: image.width, height: image.height };
          results.paths[format].push(obj);
        }
      }
      responsiveImages.push(results);
    }
    await this.portfolio.create(
      title as Translations,
      description as Translations,
      responsiveImages,
      room as RoomCode,
    );

    this.form.reset();
    this.selectedFiles = [];
    this.isLoading.set(false);
  }
}
