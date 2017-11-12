import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    firebase.initializeApp({
      apiKey: "AIzaSyC9coduE8AbWzbEypFs4UlCzozEd0cOOm4",
      authDomain: "ng-shoppingui1.firebaseapp.com"
    });
  }
}
