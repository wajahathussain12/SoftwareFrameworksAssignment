import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { ChatComponent } from './chat/chat.component'

import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { SocketService } from './socket.service'
import { LoginComponent } from './login/login.component';
import { AccountComponent } from './account/account.component'

@NgModule({
  declarations: [AppComponent, ChatComponent, LoginComponent, AccountComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, CommonModule, HttpClientModule],
  providers: [SocketService],
  bootstrap: [AppComponent]
})
export class AppModule {}
