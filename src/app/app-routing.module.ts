import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ComponentComponent } from './component/component.component';
import { EditerComponent } from './editer/editer.component';


const routes: Routes = [
  { path: '', component: ComponentComponent},
  { path: 'edit/:id', component: EditerComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
