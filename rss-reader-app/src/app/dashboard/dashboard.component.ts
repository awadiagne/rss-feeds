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
  sliceFeeds : Feed[] = [];
  currentPage: number = 0;
  count: number = 0;
  pageSize: number = 8;

  constructor(private feedService: FeedService) { }

  ngOnInit(): void {
    this.getFeeds();
    this.sliceFeeds = this.feeds.slice(this.currentPage, this.currentPage+8);
  }

  getFeeds(): void {
    this.feedService.getFeeds()
      .subscribe(feeds => this.feeds = feeds);
  }
  
  onNext() {
    if(this.currentPage > this.feeds.length && this.currentPage > 0){
      alert('Last page!')
    } else{
      this.sliceFeeds = this.feeds.slice(this.currentPage, this.currentPage + this.pageSize);
      this.currentPage = this.currentPage + this.pageSize;
    }
  }
  onPrevious(): void {
    if(this.currentPage < this.pageSize){
      alert('First page!')
    } else{
    this.sliceFeeds = this.feeds.slice(this.currentPage - this.pageSize, this.currentPage);
    this.currentPage = this.currentPage - this.pageSize;
    }
  }
}