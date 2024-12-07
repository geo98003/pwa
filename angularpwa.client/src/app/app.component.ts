import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { InventoryUpdateService } from './inventoryUpdate.service';
import { SwPush } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, InventoryUpdateService],
  template: `
    <div style="text-align:center">
      <h1>
        Pantry Inventory
      </h1>
    </div>
    <div style="margin-left:50px;padding-bottom:100px;text-align:left">
      <nav>
      <a href="/">Home</a><br />
      <a href="/inv">Scan Barcode</a><br/>
      <a href="/notification">Notification</a>
      </nav>
    </div>

    <router-outlet />
  `,
  styles: [],
  providers: []
})
export class AppComponent {
  title = 'walk-dog';
}
