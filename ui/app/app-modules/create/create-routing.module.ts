import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCoreComponent } from './create-core/create-core.component';

const routes: Routes = [
  {
    path: '',
    component: CreateCoreComponent
  }
];
@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class CreateRoutingModule { }
