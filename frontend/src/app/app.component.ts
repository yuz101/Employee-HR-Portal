import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectUser } from './store/selectors/user.selector';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'my-app';
  user$ = this.store.select(selectUser);
  isHR = this.user$.subscribe(user => user!.isHR);
  constructor(private store: Store) { }
}
