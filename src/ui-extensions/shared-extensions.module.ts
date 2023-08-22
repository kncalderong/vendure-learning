import { gql } from 'graphql-tag'
import { NgModule } from '@angular/core'

import {
  SharedModule,
  addNavMenuSection,
  addActionBarItem,
  registerFormInputComponent,
  registerPageTab,
  registerCustomDetailComponent,
  registerDashboardWidget,
} from '@vendure/admin-ui/core'
import { firstValueFrom } from 'rxjs'
import { SliderControl } from './components/intensity-controller/intensity-controller.component'
import { AllProductReviewsListComponent } from './components/all-product-reviews-list/all-product-reviews-list.component'
import { ProductInfoComponent } from './components/custom-detail-component/custom-detail-component.component'
import { ReviewsWidgetComponent } from './components/reviews-widget/reviews-widget.component'

@NgModule({
  imports: [SharedModule],
  declarations: [SliderControl, ProductInfoComponent, ReviewsWidgetComponent],
  providers: [
    registerDashboardWidget('reviews', {
      title: 'Latest reviews',
      supportedWidths: [4, 6, 8, 12],
      loadComponent: () =>
        import('./components/reviews-widget/reviews-widget.component').then(
          (m) => m.ReviewsWidgetComponent
        ),
    }),
    registerFormInputComponent('slider-form-input', SliderControl),
    registerPageTab({
      location: 'product-detail',
      tab: 'Reviews',
      route: 'reviews',
      tabIcon: 'star',
      component: AllProductReviewsListComponent,
    }),
    registerCustomDetailComponent({
      locationId: 'product-detail',
      component: ProductInfoComponent,
    }),
    addNavMenuSection({
      id: 'greeter',
      label: 'My Extensions', //name of the group in the navBar
      items: [
        {
          id: 'greeter',
          label: 'Greeter', //label of the item in the navBar
          routerLink: ['/extensions/greet'], //route of our built extension
          // Icon can be any of https://clarity.design/icons
          icon: 'cursor-hand-open',
        },
        {
          id: 'product-reviews',
          label: 'Product Reviews', //label of the item in the navBar
          routerLink: ['/extensions/product-reviews'], //route of our built extension
          // Icon can be any of https://clarity.design/icons
          icon: 'star',
        },
      ],
    }),
    addActionBarItem({
      id: 'get-review-complete',
      label: 'Get All Review Details',
      locationId: 'product-detail',
      /* routerLink: (route) => {
        const id = route.snapshot.params.id
        return ['/extensions/product-reviews', id]
      }, */
      onClick: async (event, context) => {
        const query = gql`
          query GetProductReview($id: ID!) {
            productReview(id: $id) {
              text
              rating
            }
          }
        `

        try {
          const reviewsId = context.route.snapshot.params.id
          const queryResult = await firstValueFrom(
            context.dataService
              .query(query, { id: reviewsId })
              .mapSingle((item) => item)
          )

          console.log('query result: ', queryResult)

          return queryResult
        } catch (error) {
          console.error('Error executing mutation:', error)
        }
      },
      requiresPermission: 'ReadOrder',
    }),
  ],
})
export class SharedModuleExtensions {}
