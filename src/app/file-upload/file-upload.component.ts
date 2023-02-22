import { Component, OnInit } from '@angular/core';
import {FileUploadService} from "./file-upload.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit {
  shortLink: string = "";
  loading: boolean = false;
  file: any = null;

  constructor(
    private fileUploadService: FileUploadService,
    private toastr: ToastrService
              ) { }

  ngOnInit(): void {
  }

  onChange(event: any) {
    this.file = event.target.files[0];
  }

  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.fileUploadService.upload(this.file).subscribe((response) => {
      console.log(response);
        if (response.meta.code === 200) {
          this.loading = false;
          this.toastr.success( "You can download now", "SUCCESS");
        } else {
          this.toastr.warning("FAILED");
        }
      }
    );
  }

  doDownload() {
    this.loading = true;
    this.fileUploadService.downloadFile().subscribe(blob => {
          const a = document.createElement('a');
          const objectUrl = URL.createObjectURL(blob);
          a.href = objectUrl;
          a.download = 'TimeSheet.xlsx';
          a.click();
          URL.revokeObjectURL(objectUrl);
          this.loading = false
    });
  }

}
