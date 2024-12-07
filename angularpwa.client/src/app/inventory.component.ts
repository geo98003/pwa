import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import axios, { AxiosError } from 'axios';
import { BarcodeDetectorApi } from './barcode/barcode';
import { CommonModule } from '@angular/common';
import { InventoryUpdateService } from './inventoryUpdate.service';

// declare keyword tells browser it is defined elsewhere, which is how this works
// I'd like to move to the barcode.model file, but compile issues that would take time to figure
// eslint-disable-next-line @typescript-eslint/naming-convention, no-var
export declare var BarcodeDetector: typeof BarcodeDetectorApi;

@Component({  
  selector: 'inventory',
  templateUrl: './inventory.component.html',
  styleUrl: './inventory.component.less',
  
})
export class InventoryComponent {
  title = 'Pantry Inventory';
  public updateCheckText: string = "";
  public UpcText: string = "";

    constructor() {
    if (window as any["BarcodeDetector"]) {
        this.hasBarcodeDetectorApi = true;
    }
  }

  @ViewChild('player', { static: false }) player: ElementRef<HTMLVideoElement> | undefined;

  public ShowCamera = true;
  public hasBarcodeDetectorApi = false;
  public consoleMessage: string = "";

  public async launchBarcodeScanner() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia || !this.hasBarcodeDetectorApi) {
    alert("Your device does not support the Barcode Detection API. Try again on Chrome Desktop or Android");
  }
  else {
    await this.startDetection();
  }
}

  public async startDetection() {
    //alert("starting Detection");
    if (this.player != null) {
      let stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
      this.player.nativeElement.srcObject = stream;
      this.player.nativeElement.play();

      let barcodeDetector = new BarcodeDetector({ formats: ["upc_a", "qr_code"] });
      
      this.player.nativeElement.addEventListener('loadedmetadata', async () => {
        let checkForQrCode = async () => {

          let canvas = document.createElement('canvas');
          canvas.width = this.player!.nativeElement.videoWidth;
          canvas.height = this.player!.nativeElement.videoHeight;
          let context = canvas.getContext('2d');

            context!.drawImage(this.player!.nativeElement, 0, 0, canvas.width, canvas.height);
            let barcodes = await barcodeDetector.detect(this.player!.nativeElement);
            if (barcodes.length > 0) {
              let barcodeData = barcodes[0].rawValue;
              await this.fetchData(barcodeData, barcodes[0].format);
            };
            requestAnimationFrame(checkForQrCode);
        };

        checkForQrCode();
      });
   }
}

  public async ScanBarcode() {
    this.ShowCamera = true;
      this.UpcText = "";
      this.updateCheckText = "";
    this.consoleMessage = "foobar";
    
      await this.launchBarcodeScanner();
      
  }

  //public async updateCheck(): Promise<void> {

  //  await this.fetchData("", "");
  //}

  public async fetchData(data: string, format: string) {
    //alert("fetching data" + data)
    if (format == "qr_code") {
      this.updateCheckText = "QR code found with: " + data;
      this.ShowCamera = false;
    }
    else {
      try {
        this.updateCheckText = "";
        // At request level
        //let agent = new https.Agent({
        //  rejectUnauthorized: false
        //});
        //if (this.UpcText.length > 0) {
        //  data = this.UpcText;
        //}
        let response = await axios.get("https://angularpwa-eeevfvgncdhpcpah.eastus-01.azurewebsites.net/inventory?upc=" + data);
        let items = response.data;
        //this.updateCheckText += response.status + "Foobar";
        //this.updateCheckText = Object.getOwnPropertyNames(items[0]).join(":");
        if (items.length > 0) {
          for (let i = 0; i < items.length; i++) {
            this.updateCheckText += items[i].name ?? "";
            //alert(items[i].name);
            this.ShowCamera = false;
            if (items[i].images != null && items[i].images.length > 0) {
              let canvas = document.createElement('image') as HTMLImageElement;
              canvas.id = "item_image_" + i;
              canvas.src = items[i].images[0];
              document.body.appendChild(canvas);
            }
          }
        }
        else {
          this.updateCheckText = "Nothing found";          
        }

        //this.player!.nativeElement.removeEventListener('loadedmetadata');
        //this.updateCheckText = "";
        // Handle the response
      } catch (err) {
        let error = <AxiosError>err;
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          this.updateCheckText = error.response.data + "";
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
          // http.ClientRequest in node.js
          this.updateCheckText = error.stack + "";
          console.log(error.request);
          console.log(error.toJSON());
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
      }
    }
  }
}

export class InventoryItem {
  Id: string | undefined;
  Name: string | undefined;
  Description: string | undefined;
  Images: string[] | undefined;
}
