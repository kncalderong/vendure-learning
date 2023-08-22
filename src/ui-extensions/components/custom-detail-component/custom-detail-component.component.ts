import { NgModule, Component, OnInit } from '@angular/core'
import { switchMap, Observable } from 'rxjs'
import { FormGroup } from '@angular/forms'
import { CustomFieldConfig } from '@vendure/common/lib/generated-types'
import {
  DataService,
  SharedModule,
  CustomDetailComponent,
  registerCustomDetailComponent,
} from '@vendure/admin-ui/core'
import { Product } from '@vendure/core'

@Component({
  template: ` <h1>extra info {{ extraInfo$ | async }}</h1> `,
})
export class ProductInfoComponent implements CustomDetailComponent, OnInit {
  // These two properties are provided by Vendure and will vary
  // depending on the particular detail page you are embedding this
  // component into.
  entity$: Observable<Product>
  detailForm: FormGroup

  extraInfo$: Observable<any>

  constructor() {}

  ngOnInit() {
    //switchMap(entity => this.cmsDataService.getDataFor(entity.id))
    //here you could change the product entity to show new info from external service
    this.extraInfo$ = new Observable<any>((observer) => {
      const additionalInfo = 'extra info from Observable'
      observer.next(additionalInfo)
    })
  }
}
