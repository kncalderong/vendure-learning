import { gql } from 'graphql-tag'
import { NgModule } from '@angular/core'
import {
  SharedModule,
  addNavMenuSection,
  addActionBarItem,
} from '@vendure/admin-ui/core'
import { firstValueFrom } from 'rxjs'

@NgModule({
  imports: [SharedModule],
  providers: [
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
