import { Component, OnInit, ComponentFactoryResolver } from '@angular/core'
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
  newGroupName: ''
  newName: ''
  newEmail: ''
  newRole: string
  ofGroupAdminRole: boolean
  duplicate: boolean
  deleteUse: ''

  constructor(private router: Router, private http: HttpClient) {}
  ngOnInit() {}
  // to delete the user collect the data of the user from the angular and sent to server side.
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

  makeSuper(data) {
    console.log(data)
    this.http
      .post('http://localhost:3000/create/super', { makeSuper: data })
      .subscribe((data: any) => {
        console.log(data)
        this.usersinfo = []
        for (let i = 0; i < data.length; i++) {
          this.usersinfo.push(data[i].username)
        }
      })
  }

  // the grouo button added to the angular side to sent to new page
  group() {
    this.router.navigateByUrl('/group')
  }
  // add the group to the user with the new group name
  addGroupUser() {
    this.duplicate = false
    this.http
      .post('http://localhost:3000/create/group', {
        newGroupName: this.newGroupName,
        newName: this.newName
      })
      .subscribe((data: any) => {
        for (let i = 0; i < data.length; i++) {
          console.log(data)
          if (this.newGroupName == data[i].group) {
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
            alert('added')
          } else {
            alert('not allowed')
          }
        }
      })
  }

  // to add the new user to the data JSON file.
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

  // to add the group to the file
  addtogroup(data) {
    console.log(data)
    this.http.post('http://localhost:3000/group', { newUser: data }).subscribe((data: any) => {
      // console.log(data)
    })
  }
  // to display the users information
  Clicked() {
    localStorage.setItem('username', this.name)
    localStorage.setItem('userage', this.age)
    localStorage.setItem('useremail', this.email)
    localStorage.setItem('birthdate', this.birthday)
    localStorage.setItem('role', this.role)
    this.router.navigateByUrl('/profile')
  }
  // to dispaly the information of al the users in the ssytem.
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
          }
          break
        } else if (this.role == 'groupAssis') {
          this.usersinfo = []
          this.usersrole = []
          this.usersemail = []
          alert('Not authorised, Only the person with preivelage is allowed')
        } else {
          this.usersinfo = []
          this.usersrole = []
          this.usersemail = []
          alert('Not authorised, Only the person with preivelage is allowed')
        }
      }
    })
  }
}
