import { Component } from "@angular/core";
import { BlobServiceClient, BlockBlobClient } from '@azure/storage-blob';
import { Guid } from 'guid-typescript';
//import * as webpush from 'web-push';

//const webpush = require('web-push');

@Component({
  standalone: true,
  selector: 'blobstorageService',
  template: ''
})
export class BlobStorageService {

  private AccountName = "pantry";
  private SasToken = "";
  private ContainerName = "subscriptions";
  private BlobServiceClient: BlobServiceClient;

  constructor() {
    this.BlobServiceClient = new BlobServiceClient(
      `https://${this.AccountName}.blob.core.windows.net?${this.SasToken}`,
      undefined
    );
  }

  public async GetSubscriptions() {
    const containerClient = await this.BlobServiceClient.getContainerClient(this.ContainerName);

    // create blob client
    //const blobClient = await containerClient.getBlockBlobClient(blobName);
    let iterator = containerClient.listBlobsFlat();

    let response = (await iterator.next()).value;
    while (response != undefined) {
      //let foo = response as webpush.PushSubscription;
      //console.log(foo);
      //webpush.sendNotification(foo, "Alert");
      //var sub: PushSubscription = JSON.parse(response);
      response = (await iterator.next()).value;
    }
  }

  public async WriteSubscription(sub: string) {
    const containerClient = await this.BlobServiceClient.getContainerClient(this.ContainerName);

    const blockBlobClient: BlockBlobClient = containerClient.getBlockBlobClient(Guid.create().toString());

    await blockBlobClient.upload(sub, sub.length);
  }
}
