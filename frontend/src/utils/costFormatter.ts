export function costFormatter(costInCents: string) {
  const cost = Number(costInCents) / 100

  return `R$` + cost.toFixed(2)
}
