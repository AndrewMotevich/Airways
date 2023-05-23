import { Component, HostBinding, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { HeaderDataService } from './core/services/header-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  isMain: boolean = false;

  @HostBinding('class') theme!: string;

  constructor(private router: Router, private headerData: HeaderDataService) { }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isMain = event.url === '/';
      }
    });

    this.headerData.currentTheme.subscribe(theme => {
      this.theme = theme;
    })
  }
}