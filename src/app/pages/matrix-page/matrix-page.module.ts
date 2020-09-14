import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatrixPageComponent } from './matrix-page.component';
import { RouterModule, Route } from '@angular/router';
import { HighlightModule } from '../../directives/highlight/highlight.module';

const routes: Route[] = [
  {
    path: '',
    component: MatrixPageComponent
  }
];

@NgModule({
  declarations: [MatrixPageComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    HighlightModule
  ]
})
export class MatrixPageModule { }
