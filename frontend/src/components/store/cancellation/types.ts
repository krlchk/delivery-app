export interface ICancellationState {
  cancellation: ICancellation | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

export interface ICancellation {
  id: number;
  orderId: number;
  reason: string;
  cancelledAt: Date;
}

export interface ICancellationResponse {
  data: ICancellation;
  status: number;
  message: string;
}
