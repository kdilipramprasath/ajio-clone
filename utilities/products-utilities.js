export function toRupees(num) {
  const internationalNumberFormat = new Intl.NumberFormat("en-US");
  return `Rs.${internationalNumberFormat.format(num.toFixed(0))}`;
}

export function toReducedPrice(price, offer) {
  return price - price * (offer / 100);
}

export function toNormalWord(text) {
  // to add space between "&" and "-"
  let result = text;

  if (text.includes("&")) {
    result = text.split("&").join(" & ");
  }
  if (text.includes("-")) {
    result = text.split("-").join(" ");
  }

  return result;
}
