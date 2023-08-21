import { Args, Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Allow, ListQueryBuilder, Permission, Product } from '@vendure/core'
import { ProductReview } from '../entity/product-review.entity'
import { ProductReviewsArgs } from '../generated-admin-types'

@Resolver('Product')
export class ProductEntityResolver {
  constructor(private listQueryBuilder: ListQueryBuilder) {}
  @ResolveField()
  @Allow(Permission.Public)
  async reviews(@Parent() product: Product, @Args() args: ProductReviewsArgs) {
    return this.listQueryBuilder
      .build(ProductReview, args.options || undefined, {
        where: {
          product: { id: product.id },
        },
        relations: ['product', 'product.featuredAsset'],
      })
      .getManyAndCount()
      .then(([items, totalItems]) => ({
        items,
        totalItems,
      }))
  }
}
