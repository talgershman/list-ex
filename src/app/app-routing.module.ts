import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'zones',
    pathMatch: 'full'
  },
  {
    path: 'zones',
    loadChildren: () => import('./pages/matrix-page/matrix-page.module').then(m => m.MatrixPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
