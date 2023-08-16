import { NgModule } from '@angular/core'
import { SharedModule, addNavMenuSection } from '@vendure/admin-ui/core'

@NgModule({
  imports: [SharedModule],
  providers: [
    addNavMenuSection({
      id: 'greeter',
      label: 'My Extensions', //name of the group in the navBar
      items: [
        {
          id: 'greeter',
          label: 'Greeter', //label of the item in the navBar
          routerLink: ['/extensions/greet'], //route of our built extension
          // Icon can be any of https://clarity.design/icons
          icon: 'cursor-hand-open',
        },
      ],
    }),
  ],
})
export class GreeterSharedModule {}
