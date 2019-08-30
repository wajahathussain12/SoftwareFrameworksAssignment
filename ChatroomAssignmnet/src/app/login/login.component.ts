import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { SocketService } from '../socket.service'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  name = ''
  email = ''
  correct = false
  server = 'http://localhost:3000/api/auth'

  constructor(
    private router: Router,
    private socketService: SocketService,
    private http: HttpClient
  ) {}

  ngOnInit() {}

  itemClicked() {
    this.http
      .post('http://localhost:3000/api/auth', { username: this.name, email: this.email })
      .subscribe((data: any) => {
        if (data.valid == true) {
          console.log(data)
          localStorage.setItem('username', data.username)
          localStorage.setItem('useremail', data.email)
          localStorage.setItem('userage', data.age)
          localStorage.setItem('userbirthday', data.birthdate)
          localStorage.setItem('userrole', data.role)
          this.router.navigateByUrl('/account')
        } else {
          alert('wrong, credentials')
        }
      })
  }
}
