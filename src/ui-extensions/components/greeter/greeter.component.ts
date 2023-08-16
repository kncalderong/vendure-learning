import { Component } from '@angular/core'

@Component({
  selector: 'greeter',
  template: `<vdr-page-block
    ><h1>{{ greeting }}</h1></vdr-page-block
  >`,
})
export class GreeterComponent {
  greeting = 'Hello!'
}
