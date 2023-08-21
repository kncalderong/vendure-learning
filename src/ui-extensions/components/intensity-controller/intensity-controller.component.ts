import { Component } from '@angular/core'
import { FormControl } from '@angular/forms'
import {
  IntCustomFieldConfig,
  FormInputComponent,
} from '@vendure/admin-ui/core'

@Component({
  template: `
    <input
      type="range"
      [min]="config.min || 0"
      [max]="config.max || 100"
      [formControl]="formControl"
    />
    {{ formControl.value }}
  `,
})
export class SliderControl implements FormInputComponent<IntCustomFieldConfig> {
  readonly: boolean
  config: IntCustomFieldConfig
  formControl: FormControl
}
