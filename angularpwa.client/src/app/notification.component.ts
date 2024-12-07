import { Component  } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { InventoryUpdateService } from './inventoryUpdate.service';
import { HttpClient } from '@angular/common/http';
import { BlobStorageService } from './blobstorage.service';


@Component({
  standalone: true,
  selector: 'notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.less',
  imports: [InventoryUpdateService],
  providers: [HttpClient]
})  
export class NotificationComponent {

  readonly VAPID_PUBLIC_KEY = "";
  constructor(
    private swPush: SwPush,
    private blobStorage: BlobStorageService
    ) {
  }

  public RegisterNotifications() {
    this.swPush.requestSubscription({ serverPublicKey: this.VAPID_PUBLIC_KEY })
      .then(sub => this.blobStorage.WriteSubscription(JSON.stringify(sub)))
      .catch(err => console.error("Could not subscribe to notification", err));
  }

  public SendNotification() {
    //this.blobStorage.GetSubscriptions();
  }

}
