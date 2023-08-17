import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core'
import { FormBuilder, Validators } from '@angular/forms'
import { DataService, TypedBaseDetailComponent } from '@vendure/admin-ui/core'

import gql from 'graphql-tag'
import {
  GetReviewDetailDocument,
  ProductReviewFragment,
} from './generated-types-product-review-detail'

export const GET_REVIEW_DETAIL = gql`
  query GetReviewDetail($id: ID!) {
    productReview(id: $id) {
      id
      createdAt
      text
      rating
      product {
        id
        name
        featuredAsset {
          id
          preview
        }
      }
    }
  }
`

@Component({
  selector: 'product-review-detail',
  templateUrl: './product-review-detail.component.html',
  styleUrls: ['./product-review-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ProductReviewDetailComponent
  extends TypedBaseDetailComponent<
    typeof GetReviewDetailDocument,
    'productReview'
  >
  implements OnInit, OnDestroy
{
  detailForm = this.formBuilder.group({
    text: ['', Validators.required],
    rating: [0, Validators.required],
  })

  constructor(
    private formBuilder: FormBuilder,
    protected dataService: DataService
  ) {
    super()
  }

  ngOnInit(): void {
    this.init()
  }

  ngOnDestroy(): void {
    this.destroy()
  }

  protected setFormValues(entity: ProductReviewFragment): void {
    this.detailForm.patchValue({
      text: entity.text,
      rating: entity.rating,
    })
  }
}
