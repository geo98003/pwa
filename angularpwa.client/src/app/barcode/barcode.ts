// cheating by defining what it would look like, no implementation
// interface doesn't like to define constructor or static very easily
export class BarcodeDetectorApi {
  static getSupportedFormats(): Promise<BarcodeFormat[]> {
    throw new Error('not implemented');
  }
  constructor(barcodeDetectorOptions?: BarcodeDetectorOptions) { }
  detect(image: ImageBitmapSource): Promise<DetectedBarcode[]> {
    throw new Error('not implemented');
  }
}

export interface BarcodeDetectorOptions {
  formats?: Array<BarcodeFormat>;
};

export interface Point2D {
  x: number;
  y: number;
};

export interface DetectedBarcode {
  boundingBox: DOMRectReadOnly;
  rawValue: string;
  format: BarcodeFormat;
  cornerPoints: ReadonlyArray<Point2D>;
};

export type BarcodeFormat
  = 'aztec'
  | 'code_128'
  | 'code_11'
  | 'code_39'
  | 'code_93'
  | 'codabar'
  | 'data_matrix'
  | 'ean_13'
  | 'ean_8'
  | 'itf'
  | 'pdf417'
  | 'qr_code'
  | 'micro_qr_code'
  | 'maxi_code'
  | 'upc_a'
  | 'upc_e'
  | 'gs1_composite'
  | 'gs1_databar'
  | 'gs1_databar_expanded'
  | 'gs1_databar_expanded_stacked'
  | 'gs1_databar_limited'
  | 'gs1_databar_omnidirectional'
  | 'gs1_databar_stacked'
  | 'gs1_databar_stacked_omnidirectional'
  | 'gs1_databar_truncated'
  | 'unknown';
