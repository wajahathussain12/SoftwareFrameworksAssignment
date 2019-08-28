import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ChatComponent } from './chat/chat.component'
import { LoginComponent } from './login/login.component'
import { AccountComponent } from './account/account.component'

const routes: Routes = [
  { path: '', component: ChatComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
