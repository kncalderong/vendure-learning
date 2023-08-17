import { Observable, of } from 'rxjs'
import { inject, NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@vendure/admin-ui/core'
import { AllProductReviewsListComponent } from './components/all-product-reviews-list/all-product-reviews-list.component'
import { StarRatingComponent } from './components/star-rating/star-rating.component'
import { ProductReviewDetailComponent } from './components/product-review-detail/product-review-detail.component'
import {
  GetReviewDetailDocument,
  GetReviewDetailQuery,
} from './components/product-review-detail/generated-types-product-review-detail'
import { DataService } from '@vendure/admin-ui/core'
import { map } from 'rxjs/operators'

//src\ui-extensions\greeter.component.ts
@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        pathMatch: 'full',
        component: AllProductReviewsListComponent,
        data: {
          breadcrumb: [
            {
              label: 'Product reviews',
              link: ['/extensions', 'product-reviews'],
            },
          ],
        },
      },
      {
        path: ':id',
        component: ProductReviewDetailComponent,
        resolve: {
          detail: (route: any) => {
            return inject(DataService)
              .query(GetReviewDetailDocument, { id: route.paramMap.get('id') })
              .mapStream((data) => ({ entity: of(data.productReview) }))
          },
        },
        data: { breadcrumb: reviewDetailBreadcrumb },
      },
    ]),
  ],
  declarations: [
    AllProductReviewsListComponent,
    StarRatingComponent,
    ProductReviewDetailComponent,
  ],
  exports: [StarRatingComponent, SharedModule],
})
export class ReviewsUiLazyModule {}

export function reviewDetailBreadcrumb(resolved: {
  detail: { entity: Observable<GetReviewDetailQuery['productReview']> }
}) {
  return resolved.detail.entity.pipe(
    map((entity) => [
      {
        label: 'Product reviews',
        link: ['/extensions', 'product-reviews'],
      },
      {
        label: `#${entity?.id} (${entity?.product.name})`,
        link: [],
      },
    ])
  )
}
