import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { getBase64FromImages } from 'src/app/util/imgToBase64.util';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FileUploadComponent implements OnInit {
  @Input() images: string[] = [];
  files: File[] = [];
  @Output() filesUrl: EventEmitter<string[]> = new EventEmitter<string[]>();

  constructor() { }

  ngOnInit(): void {
  }

  async onFileChange(event: any) {
    this.files = Array.from(event.target.files);
    this.images.push(... await getBase64FromImages(this.files));
    this.filesUrl.emit(this.images);
  }

  delete(index: number) {
    this.images.splice(index, 1);
  }
}
