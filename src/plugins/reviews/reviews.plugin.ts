import { PluginCommonModule, VendurePlugin } from '@vendure/core'

import { adminApiExtensions } from './api/api-extensions'
import { ProductReviewAdminResolver } from './api/product-review-admin.resolver'
import { ProductReview } from './entity/product-review.entity'

@VendurePlugin({
  imports: [PluginCommonModule],
  providers: [],
  adminApiExtensions: {
    schema: adminApiExtensions,
    resolvers: [ProductReviewAdminResolver],
  },
  entities: [ProductReview],
  compatibility: '^2.0.0',
})
export class ReviewsPlugin {}
