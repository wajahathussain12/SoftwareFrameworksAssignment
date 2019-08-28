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
  password = ''
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
      .post('http://localhost:3000/api/auth', { username: this.name, password: this.password })
      .subscribe((data: any) => {
        // console.log(data)
        if (data.valid == true) {
          console.log(data)
          sessionStorage.setItem('username', data.username)
          sessionStorage.setItem('useremail', data.email)
          sessionStorage.setItem('userage', data.age)
          sessionStorage.setItem('userbirthday', data.birthdate)
          sessionStorage.setItem('userrole', data.role)
          this.router.navigateByUrl('/account')
        } else {
          alert('wrong, credentials')
        }
      })
    // this.http.get('http://localhost:3000/senddata').subscribe((data: any) => {
    //   console.log(data)
    // for (let i of data) {
    //   console.log(data) // 1, "string", false
    //   break
    // }
    // })
  }
}
