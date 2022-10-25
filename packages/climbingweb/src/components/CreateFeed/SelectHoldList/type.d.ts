import { HoldInfoResponse } from 'climbingweb/types/response/center';

export interface Hold extends HoldInfoResponse {
  id: string;
  image: string;
  name: string;
  count: number;
  crayonImage: string;
}
