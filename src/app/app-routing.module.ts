import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormationsTableComponent } from './formations-table/formations-table.component';


const routes: Routes = [
  { path: 'formation', component: FormationsTableComponent },
  { path: '', component: FormationsTableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
