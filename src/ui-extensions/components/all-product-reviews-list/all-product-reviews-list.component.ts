import { ChangeDetectionStrategy, Component } from '@angular/core'
import { TypedBaseListComponent } from '@vendure/admin-ui/core'

import gql from 'graphql-tag'
import { GetAllReviewsDocument } from './generated-types'

export const GET_ALL_REVIEWS = gql`
  query GetAllReviews($options: ProductReviewListOptions) {
    productReviews(options: $options) {
      items {
        id
        createdAt
        text
        rating
        product {
          id
          name
          featuredAsset {
            id
            preview
          }
        }
      }
      totalItems
    }
  }
`

@Component({
  selector: 'all-product-reviews-list',
  templateUrl: './all-product-reviews-list.component.html',
  styleUrls: ['./all-product-reviews-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AllProductReviewsListComponent extends TypedBaseListComponent<
  typeof GetAllReviewsDocument,
  'productReviews'
> {
  // Here we set up the filters that will be available
  // to use in the data table
  readonly filters = this.createFilterCollection()
    .addDateFilters()
    .addFilter({
      name: 'text',
      type: { kind: 'text' },
      label: 'Text',
      filterField: 'text',
    })
    .addFilter({
      name: 'rating',
      type: { kind: 'number' },
      label: 'Rating',
      filterField: 'rating',
    })
    .connectToRoute(this.route)

  // Here we set up the sorting options that will be available
  // to use in the data table
  readonly sorts = this.createSortCollection()
    .defaultSort('createdAt', 'DESC')
    .addSort({ name: 'createdAt' })
    .addSort({ name: 'text' })
    .addSort({ name: 'rating' })
    .connectToRoute(this.route)

  constructor() {
    super()
    super.configure({
      document: GetAllReviewsDocument,
      getItems: (data) => data.productReviews,
      setVariables: (skip, take) => ({
        options: {
          skip,
          take,
          filter: {
            ...this.filters.createFilterInput(),
          },
          sort: this.sorts.createSortInput(),
        },
      }),
      refreshListOnChanges: [
        this.filters.valueChanges,
        this.sorts.valueChanges,
      ],
    })
  }
}
