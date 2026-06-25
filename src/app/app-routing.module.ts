import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { UpdateComponent } from './users/update/update.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {path: '', redirectTo: 'users', pathMatch: 'full' },
  {path: 'users', component: UsersComponent },
  {path: 'users/create', component: CreateUserComponent },
  {path: 'users/update/:id', component: UpdateComponent},
  {path: '**', redirectTo: 'users' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
