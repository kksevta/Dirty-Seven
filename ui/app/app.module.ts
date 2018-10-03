import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule, ActionReducer } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CoreModule } from '@app/core/core.module';
import { storeLogger } from 'ngrx-store-logger';
import { environment } from '@env/environment';
import { AppEffectsCollection } from './store/effects';
import { reducers } from './store/reducers/root.reducer';
import { AppWrapperComponent } from './app-wrapper/app-wrapper.component';
import { SharedModule } from './shared/shared.module';
export function logger(reducer: ActionReducer<any>): any {
  return storeLogger()(reducer);
}
const metaReducers = environment.production ? [] : [logger];

@NgModule({
  declarations: [
    AppComponent,
    AppWrapperComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([...AppEffectsCollection])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
