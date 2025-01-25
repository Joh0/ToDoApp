import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ListComponent } from './list/list.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';
import { RecycleComponent } from './recycle/recycle.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'home', component: MainComponent, pathMatch: 'full'},
  { path: 'list', component: ListComponent, canActivate: [AuthGuard], children: [
    { path: 'edit', component: EditComponent }
  ]},
  { path: 'recycle', component: RecycleComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: '**', component: MainComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes/*, { enableTracing: true }*/)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
