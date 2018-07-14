import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ExpensesComponent } from './expenses/expenses.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CreateComponent } from './create/create.component';
import { DummyComponent } from './dummy/dummy.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path:"expenses", component:ExpensesComponent},
  { path:"login", component:LoginComponent},
  { path:'register', component:RegisterComponent},
  { path:'create', component:CreateComponent},
  { path:'dummy', component:DummyComponent},
  { path:'update', component:UpdateComponent},
  { path:'', redirectTo:"/login", pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
