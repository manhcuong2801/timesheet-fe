import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {EnvConfig} from "../core/model/env-config";

@Injectable({
  providedIn: 'root'
})
export class EnvConfigService {
  envConfig: EnvConfig;
  envConfigNull: EnvConfig = null;

  constructor(private http: HttpClient) { }

  loadEnvConfig() {
    if (!this.envConfig) {
      // @ts-ignore
      return this.http.get<EnvConfig>('/assets/env_prod.json')
        .toPromise<EnvConfig>()
        .then(data => {
          this.envConfig = data;
        });
    }
    return Promise.resolve(this.envConfigNull);
  }

  getConfig() {
    if (this.envConfig) {
      return this.envConfig.apiUrl;
    }
    return '';
  }

}
