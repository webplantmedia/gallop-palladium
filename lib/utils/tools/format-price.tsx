export function formatPrice(price: number) {
  if (price < 1000000) {
    return '$' + price / 1000 + ' K';
  } else {
    return '$' + price / 1000000 + ' Million';
  }
}
