export enum OrderStatus {
  Submitted = 'submitted',
  Pending = 'pending',
  Cancelled = 'cancelled',
  Success = 'success',
}

export enum PayseraOrderStatus {
  PaymentHasNotBeenExecuted,
  PaymentSuccessful,
  PaymentOrderAcceptedButNotYetExecuted,
  AdditionalPaymentInformation,
  PaymentWasExecutedButConfirmationAboutReceivedFundsInBankWonTBeSent,
}
