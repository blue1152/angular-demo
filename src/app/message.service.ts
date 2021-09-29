import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  constructor() { }

  add(message: string) {
    this.messages.push(message);
  }

  delete() {
    this.messages.splice(0, 1);
  }

  clear() {
    this.messages = [];
  }
}
