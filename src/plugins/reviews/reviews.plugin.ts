import { LanguageCode, PluginCommonModule, VendurePlugin } from '@vendure/core'

import { adminApiExtensions, shopApiExtensions } from './api/api-extensions'
import { ProductReviewAdminResolver } from './api/product-review-admin.resolver'
import { ProductReview } from './entity/product-review.entity'
import { ProductEntityResolver } from './api/product-entity.resolver'

@VendurePlugin({
  imports: [PluginCommonModule],
  providers: [],
  entities: [ProductReview],
  adminApiExtensions: {
    schema: adminApiExtensions,
    resolvers: [ProductReviewAdminResolver, ProductEntityResolver],
  },
  shopApiExtensions: {
    schema: shopApiExtensions,
    resolvers: [ProductEntityResolver],
  },
  compatibility: '^2.0.0',
})
export class ReviewsPlugin {}
