import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnvConfigService} from "../service/env-config.service";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

// API url

  constructor(
    private http: HttpClient,
    private envConfigService: EnvConfigService
  ) {
  }

  baseUrl: string = this.envConfigService.getConfig();

// Returns an observable
  upload(file): Observable<any> {

    // Create form data
    const formData = new FormData();

    // Store form name as "file" with file data
    formData.append("excel_file", file, file.name);

    // Make http post request over api
    // with formData as req
    return this.http.post(`${this.baseUrl}/import_file/`, formData);
  }

  downloadFile(file?: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/download_file/`, {
      responseType: 'blob'
    });
  }
}
