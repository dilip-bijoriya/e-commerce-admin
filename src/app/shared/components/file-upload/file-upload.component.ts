import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  @Input() files: File[] = [];
  @Output() filesUploaded: EventEmitter<File[]> = new EventEmitter<File[]>();
  images: string[] = [];
  constructor() { }

  ngOnInit(): void {

  }

  onFileChange(event: any) {
    this.files = Array.from(event.target.files);
    this.images = this.files.map(file => URL.createObjectURL(file));
    this.filesUploaded.emit(this.files);
  }


  delete(index: number) {
    this.images.splice(index, 1);
  }
}
