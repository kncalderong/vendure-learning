import { DeepPartial } from '@vendure/common/lib/shared-types'
import { Product, ProductVariant, VendureEntity } from '@vendure/core'
import { Column, Entity, ManyToOne } from 'typeorm'

@Entity()
export class ProductReview extends VendureEntity {
  constructor(input?: DeepPartial<ProductReview>) {
    super(input)
  }

  @Column()
  text: string

  @Column()
  rating: number

  @ManyToOne((type) => Product)
  product: Product
}
