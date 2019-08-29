import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'
import { observable } from 'rxjs'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  email = sessionStorage.getItem('useremail')
  name = sessionStorage.getItem('username')
  birthday = sessionStorage.getItem('userbirthday')
  age = sessionStorage.getItem('userage')
  role = sessionStorage.getItem('userrole')

  usersinfo = []
  usersrole = []
  usersemail = []

  newName: ''
  newEmail: ''
  newRole: string
  ofGroupAdminRole: boolean

  deleteUse: ''

  constructor(private router: Router, private http: HttpClient) {}
  ngOnInit() {}

  deleteUser() {
    console.log(this.usersinfo)
    for (let i = 0; i < this.usersinfo.length; i++) {
      if (this.usersinfo[i] == this.usersinfo) {
      }
      // if(this.usersinfo[i] == )
      // this.http.delete('http://localhost:3000/delete/user', {}).subscribe((data: any) => {
      //   console.log(data)
      // })
      break
    }
  }

  addUser() {
    if (this.ofGroupAdminRole == true) {
      this.newRole = 'groupAdmin'
    } else {
      this.newRole = 'users'
    }
    if (this.role == 'superAdmin') {
      console.log(this.newRole)
      this.http
        .post('http://localhost:3000/create/users', {
          newName: this.newName,
          newEmail: this.newEmail,
          newRole: this.newRole
        })
        .subscribe((data: any) => {
          console.log(data)
        })
    } else {
      alert('not super')
    }
  }

  addtogroup() {
    for (let i = 0; i < this.usersinfo.length; i++) {
      console.log(this.usersinfo[i])
      console.log('heheh')
      this.http.get('http://localhost:3000/create/group', {}).subscribe((data: any) => {
        console.log(data)
      })
      break
    }
  }

  Clicked() {
    sessionStorage.setItem('username', this.name)
    sessionStorage.setItem('userage', this.age)
    sessionStorage.setItem('useremail', this.email)
    sessionStorage.setItem('birthdate', this.birthday)
    sessionStorage.setItem('role', this.role)

    this.router.navigateByUrl('/profile')
  }

  showed() {
    this.http.get('http://localhost:3000/senddata', {}).subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        if (this.role == 'groupAdmin') {
          this.usersinfo = []
          this.usersrole = []
          this.usersemail = []
          for (i = 0; i < data.length; i++) {
            this.usersinfo.push(data[i].username)
            this.usersrole.push(data[i].role)
            this.usersemail.push(data[i].email)
          }
          break
        } else if (this.role == 'superAdmin') {
          this.usersinfo = []
          this.usersrole = []
          this.usersemail = []
          for (i = 0; i < data.length; i++) {
            this.usersinfo.push(data[i].username)
            this.usersrole.push(data[i].role)
            this.usersemail.push(data[i].email)
            console.log(data[i].username)
          }
          break
        } else if (this.role == 'groupAssis') {
          this.usersinfo = []
          this.usersrole = []
          this.usersemail = []
        } else {
          this.usersinfo = []
          this.usersrole = []
          this.usersemail = []
        }
      }
    })
  }
}
