import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';


const routes: Routes = [
  {
    path: 'starships',
    data: { preload: true},
    loadChildren: () => import('./starship/starship.module').then(m => m.StarshipModule)
  },
  {
    path: 'pilots',
    data: { preload: true},
    loadChildren: () => import('./pilot/pilot.module').then(m => m.PilotModule)
  },
  { path: '', redirectTo: 'starships', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
