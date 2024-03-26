import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PessoaComponent } from './pessoa/pessoa.component';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/pessoa',
    pathMatch: 'full',
  },
  {
    path: 'pessoa',
    component: PessoaComponent, // Assuming PessoaComponent is the component you want to navigate to
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {
      useHash: true,
      relativeLinkResolution: 'legacy',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
