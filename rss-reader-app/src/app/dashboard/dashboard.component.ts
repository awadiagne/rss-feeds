import { Component, OnInit } from '@angular/core';
import { Feed } from '../feed';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  feeds: Feed[] = [];

  constructor(private feedService: FeedService) { }

  ngOnInit(): void {
    this.getFeeds();
  }

  getFeeds(): void {
    this.feedService.getFeeds()
      .subscribe(feeds => this.feeds = feeds);
  }
}