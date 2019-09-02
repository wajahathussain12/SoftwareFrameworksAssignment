import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import * as io from 'socket.io-client'
const SERVER_URL = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket
  roomno = 1
  constructor() {}
  // the socket function gets the server url
  public initSocket(): void {
    this.socket = io(SERVER_URL)
  }
  // once the message is recived it is emmited to the page.
  public send(message: string): void {
    this.socket.emit('message', message)
  }
  //  here the message is collected and dispalyed.
  public onMessage(): Observable<any> {
    let observable = new Observable(observer => {
      this.socket.on('message', (data: string) => observer.next(data))
    })
    let nobservable = new Observable(observer => {
      this.socket.join()
    })
    return observable
  }
}
