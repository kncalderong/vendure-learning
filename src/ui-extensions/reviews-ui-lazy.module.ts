import { NgModule } from '@angular/core'
import { RouterModule } from '@angular/router'
import { SharedModule } from '@vendure/admin-ui/core'
import { GreeterComponent } from './components/greeter/greeter.component'
import { AllProductReviewsListComponent } from './components/all-product-reviews-list/all-product-reviews-list.component'
import { StarRatingComponent } from './components/star-rating/star-rating.component'

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
    ]),
  ],
  declarations: [AllProductReviewsListComponent, StarRatingComponent],
  exports: [StarRatingComponent, SharedModule],
})
export class ReviewsUiLazyModule {}
