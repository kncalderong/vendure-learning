export type InputMaybe<T> = T

export type SubmitProductReviewInput = {
  productId: string | number
  rating: number
  text: string
}

export enum LogicalOperator {
  AND = 'AND',
  OR = 'OR',
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export type NumberRange = {
  end: Scalars['Float']['input']
  start: Scalars['Float']['input']
}

export type DateRange = {
  end: Scalars['DateTime']['input']
  start: Scalars['DateTime']['input']
}

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string | number; output: string | number }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  DateTime: { input: any; output: any }
  JSON: { input: any; output: any }
  Money: { input: any; output: any }
  Upload: { input: any; output: any }
}

/** Operators for filtering on a Int or Float field */
export type NumberOperators = {
  between?: InputMaybe<NumberRange>
  eq?: InputMaybe<Scalars['Float']['input']>
  gt?: InputMaybe<Scalars['Float']['input']>
  gte?: InputMaybe<Scalars['Float']['input']>
  isNull?: InputMaybe<Scalars['Boolean']['input']>
  lt?: InputMaybe<Scalars['Float']['input']>
  lte?: InputMaybe<Scalars['Float']['input']>
}

/** Operators for filtering on a String field */
export type StringOperators = {
  contains?: InputMaybe<Scalars['String']['input']>
  eq?: InputMaybe<Scalars['String']['input']>
  in?: InputMaybe<Array<Scalars['String']['input']>>
  isNull?: InputMaybe<Scalars['Boolean']['input']>
  notContains?: InputMaybe<Scalars['String']['input']>
  notEq?: InputMaybe<Scalars['String']['input']>
  notIn?: InputMaybe<Array<Scalars['String']['input']>>
  regex?: InputMaybe<Scalars['String']['input']>
}

/** Operators for filtering on an ID field */
export type IdOperators = {
  eq?: InputMaybe<Scalars['String']['input']>
  in?: InputMaybe<Array<Scalars['String']['input']>>
  isNull?: InputMaybe<Scalars['Boolean']['input']>
  notEq?: InputMaybe<Scalars['String']['input']>
  notIn?: InputMaybe<Array<Scalars['String']['input']>>
}

/** Operators for filtering on a DateTime field */
export type DateOperators = {
  after?: InputMaybe<Scalars['DateTime']['input']>
  before?: InputMaybe<Scalars['DateTime']['input']>
  between?: InputMaybe<DateRange>
  eq?: InputMaybe<Scalars['DateTime']['input']>
  isNull?: InputMaybe<Scalars['Boolean']['input']>
}

export type ProductReviewListOptions = {
  /** Allows the results to be filtered */
  filter?: InputMaybe<ProductReviewFilterParameter>
  /** Specifies whether multiple "filter" arguments should be combines with a logical AND or OR operation. Defaults to AND. */
  filterOperator?: InputMaybe<LogicalOperator>
  /** Skips the first n results, for use in pagination */
  skip?: InputMaybe<Scalars['Int']['input']>
  /** Specifies which properties to sort the results by */
  sort?: InputMaybe<ProductReviewSortParameter>
  /** Takes n results, for use in pagination */
  take?: InputMaybe<Scalars['Int']['input']>
}

export type ProductReviewFilterParameter = {
  text?: InputMaybe<StringOperators>
  createdAt?: InputMaybe<DateOperators>
  id?: InputMaybe<IdOperators>
  rating?: InputMaybe<NumberOperators>
}

export type ProductReviewSortParameter = {
  text?: InputMaybe<SortOrder>
  createdAt?: InputMaybe<SortOrder>
  id?: InputMaybe<SortOrder>
  rating?: InputMaybe<SortOrder>
}

export type MutationSubmitProductReviewArgs = {
  input: SubmitProductReviewInput
}

export type QueryProductReviewsArgs = {
  options?: InputMaybe<ProductReviewListOptions>
}
