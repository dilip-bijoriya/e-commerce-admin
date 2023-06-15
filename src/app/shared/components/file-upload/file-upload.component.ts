import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FileUploadComponent implements OnInit {
  @Input() files: File[] = [];
  @Output() filesUploaded: EventEmitter<File[]> = new EventEmitter<File[]>();
  images: Array<any> = [];
  constructor() { }

  ngOnInit(): void {
  }

  onFileChange(event: any) {
    this.files = Array.from(event.target.files);
    this.images = this.files.map(file => URL.createObjectURL(file));
    this.filesUploaded.emit(this.images);
  }


  delete(index: number) {
    this.images.splice(index, 1);
  }
}
