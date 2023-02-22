import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FileUploadComponent } from './file-upload/file-upload.component';
import {HttpClientModule} from "@angular/common/http";
import {ToastNoAnimationModule, ToastrModule} from "ngx-toastr";
import {EnvConfigService} from "./service/env-config.service";


const appEnvInitializerFn = (envConfig: EnvConfigService) => {
  return () => {
    return envConfig.loadEnvConfig();
  };
};


@NgModule({
  declarations: [
    AppComponent,
    FileUploadComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    ToastNoAnimationModule.forRoot()
  ],
  providers: [
    EnvConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: appEnvInitializerFn,
      multi: true,
      deps: [EnvConfigService]
    },
  ],
  bootstrap: [AppComponent],
  exports: [],
  schemas: [
    NO_ERRORS_SCHEMA,
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
