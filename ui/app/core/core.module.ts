import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { throwErrorIfAlreadyLoaded } from './module-import-guard';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { CoreHttpInterceptor } from './interceptors/core-http.interceptor';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: CoreHttpInterceptor, multi: true },
];


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PageNotFoundComponent],
  exports: [
    HttpClientModule
  ],
  providers: [
    httpInterceptorProviders
  ]
})
export class CoreModule {

  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwErrorIfAlreadyLoaded(parentModule, 'CoreModule');
  }
}
