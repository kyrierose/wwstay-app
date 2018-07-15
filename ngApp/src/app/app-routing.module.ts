import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpensesComponent } from './expenses/expenses.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateComponent } from './create/create.component';
import { DummyComponent } from './dummy/dummy.component';
import { UpdateComponent } from './update/update.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path:"expenses", component:ExpensesComponent, canActivate:[AuthGuard]},
  { path:"login", component:LoginComponent},
  { path:'register', component:RegisterComponent},
  { path:'create', component:CreateComponent, canActivate:[AuthGuard]},
  { path:'dummy', component:DummyComponent},
  { path:'update', component:UpdateComponent, canActivate:[AuthGuard]},
  { path:'', redirectTo:"/login", pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
