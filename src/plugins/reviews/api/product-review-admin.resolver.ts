import {
  MutationSubmitProductReviewArgs,
  QueryProductReviewArgs,
  QueryProductReviewsArgs,
} from './../generated-admin-types'
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
  ListQueryBuilder,
} from '@vendure/core'
import { ProductReview } from '../entity/product-review.entity'

@Resolver()
export class ProductReviewAdminResolver {
  constructor(
    private connection: TransactionalConnection,
    private listQueryBuilder: ListQueryBuilder
  ) {}

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

  @Query()
  @Allow(Permission.Public)
  async productReviews(
    @Ctx() ctx: RequestContext,
    @Args() args: QueryProductReviewsArgs
  ) {
    return this.listQueryBuilder
      .build(ProductReview, args.options || undefined, {
        relations: ['product'],
        ctx,
      })
      .getManyAndCount()
      .then(([items, totalItems]) => ({
        items,
        totalItems,
      }))
  }

  @Query()
  @Allow(Permission.Public)
  async productReview(
    @Ctx() ctx: RequestContext,
    @Args() args: QueryProductReviewArgs
  ) {
    return this.connection.getRepository(ctx, ProductReview).findOne({
      where: { id: args.id },
      relations: {
        product: true,
      },
    })
  }
}
