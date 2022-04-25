import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Feed } from '../feed';
import { FeedService } from '../feed.service';


@Component({
  selector: 'app-feeds-detail',
  templateUrl: './feeds-detail.component.html',
  styleUrls: ['./feeds-detail.component.css']
})
export class FeedsDetailComponent implements OnInit {
   feed: Feed | undefined;
  
  constructor(
    private route: ActivatedRoute,
    private feedService: FeedService,
    private location: Location) { }

    ngOnInit(): void {
      this.getFeed();
    }
    
    getFeed(): void {
      let id:string = this.route.snapshot.paramMap.get('id')!;
      this.feedService.getFeed(id)
        .subscribe(feed => this.feed = feed);
    }

    updateFeed(): void{
      if (this.feed) {
        this.feedService.updateFeed(this.feed)
          .subscribe(() => this.goBack());
      }
    }

    goBack(): void {
      this.location.back();
    }
}
