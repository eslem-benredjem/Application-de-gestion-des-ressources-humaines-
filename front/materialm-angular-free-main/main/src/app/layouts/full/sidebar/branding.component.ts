import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-branding',
  standalone: true,
  imports: [RouterModule],
  template: `
    <div class="branding">
      <a [routerLink]="['/']">
      <img src="assets/images/products/logo2.jpg" width="220" height="50" loading="lazy" alt="product image" />
      </a>
    </div>
  `,
})
export class BrandingComponent {
  constructor() {}

}
