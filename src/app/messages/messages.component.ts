import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  // 會在外部的html檔中直接使用 (Angular 只會繫結到元件的公共屬性)
  constructor(
    public messageService: MessageService // 必須是public
  ) { }

  ngOnInit(): void {
  }

}
