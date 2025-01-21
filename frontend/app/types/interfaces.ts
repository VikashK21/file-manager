export interface DirecotryDataInterface {
  _id: string;
  level: string;
  name: string;
  type: string;
  path?: string;
}

export interface PayloadData {
  name: string;
  type?: string;
  level?: string;
  path?: object;
}
