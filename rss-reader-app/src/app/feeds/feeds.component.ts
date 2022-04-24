import { Component, OnInit } from '@angular/core';

import { Feed } from '../feed';
import { FeedService } from '../feed.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-feeds',
  templateUrl: './feeds.component.html',
  styleUrls: ['./feeds.component.css']
})
export class FeedsComponent implements OnInit {

  feeds: Feed[] = [];

  constructor(private feedService: FeedService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getFeeds();
  }

  getFeeds(): void {
    this.feedService.getFeeds().subscribe(feeds => this.feeds = feeds);
  }

}

