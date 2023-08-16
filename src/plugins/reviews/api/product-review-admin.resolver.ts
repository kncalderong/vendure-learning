import { MutationSubmitProductReviewArgs } from './../generated-admin-types'
import { Inject } from '@nestjs/common'
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql'
import {
  Permission,
  Allow,
  RequestContext,
  Ctx,
  TransactionalConnection,
  Transaction,
  Product,
} from '@vendure/core'
import { ProductReview } from '../entity/product-review.entity'

@Resolver()
export class ProductReviewAdminResolver {
  constructor(private connection: TransactionalConnection) {}

  @Transaction()
  @Mutation()
  @Allow(Permission.Public)
  async submitProductReview(
    @Ctx() ctx: RequestContext,
    @Args() { input }: MutationSubmitProductReviewArgs
  ) {
    console.log('input: ', input)

    const review = new ProductReview(input)
    const product = await this.connection.getEntityOrThrow(
      ctx,
      Product,
      input.productId
    )
    review.product = product
    return this.connection.getRepository(ctx, ProductReview).save(review)
  }
}
