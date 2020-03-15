import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent implements OnInit {
  pageTitle = 'Task Manager';

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logOut(): void {
    this.router.navigate(['/welcome']);
  }
}
