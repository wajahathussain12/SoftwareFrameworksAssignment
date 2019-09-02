import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { ChatComponent } from './chat/chat.component'
import { LoginComponent } from './login/login.component'
import { AccountComponent } from './account/account.component'
import { GroupComponent } from './group/group.component'

const routes: Routes = [
  { path: '', component: ChatComponent },
  { path: 'login', component: LoginComponent },
  { path: 'account', component: AccountComponent },
  { path: 'group', component: GroupComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
