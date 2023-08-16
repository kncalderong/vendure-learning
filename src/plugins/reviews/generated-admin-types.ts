export type SubmitProductReviewInput = {
  productId: string | number
  rating: number
  text: string
}

export type MutationSubmitProductReviewArgs = {
  input: SubmitProductReviewInput
}
