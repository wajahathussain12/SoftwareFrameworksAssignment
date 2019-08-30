import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  email = localStorage.getItem('useremail')
  name = localStorage.getItem('username')
  birthday = localStorage.getItem('userbirthday')
  age = localStorage.getItem('userage')
  role = localStorage.getItem('userrole')

  usersObject = {}
  usersinfo = []
  usersrole = []
  usersemail = []

  newName: ''
  newEmail: ''
  newRole: string
  ofGroupAdminRole: boolean
  duplicate: boolean

  deleteUse: ''

  constructor(private router: Router, private http: HttpClient) {}
  ngOnInit() {}

  deleteUser(data) {
    this.http
      .post('http://localhost:3000/delete/user', { deleteUser: data })
      .subscribe((data: any) => {
        console.log(data)
        this.usersinfo = []
        for (let i = 0; i < data.length; i++) {
          this.usersinfo.push(data[i].username)
        }
      })
  }

  addUser() {
    this.duplicate = false
    this.http.get('http://localhost:3000/senddata', {}).subscribe((data: any) => {
      for (let i = 0; i < data.length; i++) {
        if (this.newName == data[i].username) {
          alert('user exists')
          this.duplicate = true
          break
        }
      }

      if (this.duplicate != true) {
        if (this.ofGroupAdminRole == true) {
          this.newRole = 'groupAdmin'
        } else {
          this.newRole = 'users'
        }
        if (this.role == 'superAdmin' || this.role == 'groupAdmin') {
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
          alert('not allowed')
        }
      }
    })
  }

  addtogroup(data) {
    this.http
      .post('http://localhost:3000/create/group', { user: data, group: 1 })
      .subscribe((data: any) => {
        // console.log(data)
      })
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
      this.usersObject = data
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
            // console.log(data[i].username)
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
