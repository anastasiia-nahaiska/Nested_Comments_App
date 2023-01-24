import { Blob } from "buffer";

export interface IPost {
  username: string;
  email: string;
  text: string;
  file?: Blob;
  homepage?: string;
}

