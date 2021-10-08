import { Component, OnInit } from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {distinctUntilChanged} from 'rxjs/operators';
import { Meta } from '@angular/platform-browser';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  title = 'Tour of Heroes';
  items: Observable<any[]>;

  constructor(
    private router: Router,
    private metaService: Meta,
    firestore: AngularFirestore,
  ) {
    this.items = firestore.collection('test').valueChanges();
  }

  ngOnInit() {
    // meta setting
    this.metaService.addTags([
      {name: 'keywords', content: 'Angular, Universal, Example'},
      {name: 'description', content: 'Angular Universal Example'},
      {name: 'robots', content: 'index, follow'}
    ]);
    // ga event
    this.router.events
      .pipe(distinctUntilChanged((previous: any, current: any) => {
        if (current instanceof NavigationEnd) {
          return previous.url === current.url;
        }
        return true;
      }))
      .subscribe(
        (x: any) => {
          gtag('event', 'page_view', { 'page_path': x.url });
        }
      );
  }
}
