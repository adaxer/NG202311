import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SignalRService } from './services/signal-r.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './app.component.html',
  styleUrls  : ["./app.component.css"],
})
export class AppComponent implements OnInit{

  constructor(private signalR: SignalRService){
  }
  title = 'MovieApp';
  menuTitle = "Sitemap";

  ngOnInit(): void {
    this.signalR.startConnection();
  }
}
