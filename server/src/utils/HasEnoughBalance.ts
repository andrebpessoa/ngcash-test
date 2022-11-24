export const hasEnoughBalance = (currentBalance: number, balanceToTransfer: number): boolean => {
  if (currentBalance - balanceToTransfer >= 0) {
    return true
  }

  return false
}
