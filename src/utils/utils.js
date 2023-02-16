export const genFormatter = new Intl.NumberFormat("en-US", {
  notation: "compact",
  maximumFractionDigits: 2,
});

export function onInputNumberChange(e, f) {
  const re = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;
  if (e.target.value === "" || re.test(e.target.value)) {
    f(e.target.value);
  }
}

export function parseDecimals(num, decimals) {
  var re = new RegExp("^-?\\d+(?:.\\d{0," + (decimals || -1) + "})?");
  return num.toString().match(re)[0];
}
