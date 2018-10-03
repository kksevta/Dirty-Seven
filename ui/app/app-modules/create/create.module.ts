import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCoreComponent } from './create-core/create-core.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { CreateEffectsCollection } from './store/effects';
import { reducers } from './store/reducers/root.reducer';
import { CreateRoutingModule } from '@app/app-modules/create/create-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CreateRoutingModule,
    StoreModule.forFeature('create', reducers),
    EffectsModule.forFeature([...CreateEffectsCollection])
  ],
  declarations: [CreateCoreComponent]
})
export class CreateModule { }
