import { Component, NgModule, OnInit } from '@angular/core'
import { DataService, SharedModule } from '@vendure/admin-ui/core'
import { Observable } from 'rxjs'
import { gql } from 'graphql-tag'

@Component({
  selector: 'reviews-widget',
  template: `
    <ul>
      <li *ngFor="let review of pendingReviews$ | async">
        <a [routerLink]="['/extensions', 'product-reviews', review.id]">{{
          review.text
        }}</a>
        <span class="rating">{{ review.rating }} / 5</span>
      </li>
    </ul>
  `,
})
export class ReviewsWidgetComponent implements OnInit {
  pendingReviews$: Observable<any>

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.pendingReviews$ = this.dataService
      .query(
        gql`
          query GetAllReviews($options: ProductReviewListOptions) {
            productReviews(options: $options) {
              items {
                id
                createdAt
                text
                rating
              }
            }
          }
        `,
        {
          options: {
            take: 10,
          },
        }
      )
      .mapStream((data: any) => data.productReviews.items)
  }
}
