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
`

export const adminApiExtensions = gql`
  ${commonApiExtensions}

  input SubmitProductReviewInput {
    productId: ID!
    rating: Float!
    text: String!
  }

  extend type Mutation {
    submitProductReview(input: SubmitProductReviewInput!): ProductReview!
  }
`
