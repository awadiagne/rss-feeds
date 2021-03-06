import { Injectable } from '@angular/core';
import { Feed } from './feed';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse  } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedService {

  private REST_API_SERVER = "http://localhost:8080/feeds";
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient, private messageService: MessageService) { }

  getFeeds(): Observable<Feed[]> {
    this.messageService.add('FeedService: RSS feeds fetched! Press Next to see the feeds');

    return this.http.get<Feed[]>(this.REST_API_SERVER)
      .pipe(
        tap(_ => this.log('Fetching successful')),
        catchError(this.handleError<Feed[]>('getFeeds', []))
      );
  }

  getFeed(id: string): Observable<Feed> {
    const url = `${this.REST_API_SERVER}/${id}`;
    return this.http.get<Feed>(url).pipe(
      tap(_ => this.log(`fetched feed id=${id}`)),
      catchError(this.handleError<Feed>(`getFeed id=${id}`))
    );
  }

  updateFeed(feed: Feed): Observable<any> {
    return this.http.put(this.REST_API_SERVER, feed, this.httpOptions).pipe(
      tap(_ => this.log(`Updated feed=${feed._id}`)),
      catchError(this.handleError<any>('updateFeed'))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`FeedService: ${message}`);
  }
}