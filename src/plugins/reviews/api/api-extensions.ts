import { gql } from 'graphql-tag'

export const commonApiExtensions = gql`
  type ProductReview implements Node {
    id: ID!
    createdAt: DateTime!
    updatedAt: DateTime!
    product: Product!
    text: String!
    rating: Float!
  }

  type ProductReviewList implements PaginatedList {
    items: [ProductReview!]!
    totalItems: Int!
  }

  # Auto-generated at runtime
  input ProductReviewListOptions
`

export const adminApiExtensions = gql`
  ${commonApiExtensions}

  input SubmitProductReviewInput {
    productId: ID!
    rating: Float!
    text: String!
  }

  extend type Query {
    productReviews(options: ProductReviewListOptions): ProductReviewList!
    productReview(id: ID!): ProductReview
  }

  extend type Mutation {
    submitProductReview(input: SubmitProductReviewInput!): ProductReview!
  }
`
