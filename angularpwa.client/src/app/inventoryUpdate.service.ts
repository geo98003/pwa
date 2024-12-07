import { Component, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BlobStorageService } from "./blobstorage.service";


//@Injectable({
//  providedIn: 'any'
//})
@Component({
  standalone: true,
  selector: 'inventoryUpdateService',
  template: ''
  //templateUrl: './notification.component.html',
  //styleUrl: './notification.component.less',
  //imports: [InventoryUpdateService],
  //providers: [InventoryUpdateService]
})
export class InventoryUpdateService {

  constructor(private http: HttpClient, private blobStorage: BlobStorageService) {

  }

  addPushSubscriber(sub: PushSubscription) {
    console.log(sub);
    this.blobStorage.WriteSubscription(JSON.stringify(sub));
    //var sub: PushSubscription = JSON.parse(jsonString);
    //return this.http.post('/inventory/subscribe', sub);
  }

  send() {
    return this.http.post('/api/newsletter', null);
  }

}
