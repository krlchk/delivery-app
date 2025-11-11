export interface CreateCancellationDto {
  orderId: number;
  reason: string;
}

export interface ICancellation {
  id: number;
  orderId: number;
  reason: string;
  cancelledAt: Date;
}
