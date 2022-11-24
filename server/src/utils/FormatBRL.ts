export const formatBRL = (balance: number): string => Intl.NumberFormat('pt-br', {
  style: 'currency',
  currency: 'BRL'
}).format(Number(balance))
