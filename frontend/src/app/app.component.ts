import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from './core/services/auth.service';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    SharedModule
  ],
  template: `
    <app-navbar *ngIf="isLoggedIn$ | async"></app-navbar>
    <app-spinner></app-spinner>
    <router-outlet></router-outlet>
  `
})
export class AppComponent implements OnInit {
  isLoggedIn$: any;

  constructor(private authService: AuthService) {
    this.isLoggedIn$ = this.authService.isLoggedIn$;
  }

  ngOnInit(): void {
    this.authService.checkSession();
  }
}