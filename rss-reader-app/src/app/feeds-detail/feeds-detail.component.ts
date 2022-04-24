import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Feed } from '../feed';
import { FeedService } from '../feed.service';


@Component({
  selector: 'app-feeds-detail',
  templateUrl: './feeds-detail.component.html',
  styleUrls: ['./feeds-detail.component.css']
})
export class FeedsDetailComponent implements OnInit {
  @Input() feed?: Feed;
  
  constructor(private route: ActivatedRoute,
    private feedService: FeedService,
    private location: Location) { }

    ngOnInit(): void {
      this.getFeed();
    }
    
    getFeed(): void {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.feedService.getFeed(id)
        .subscribe(feed => this.feed = feed);
    }

    goBack(): void {
      this.location.back();
    }
}
