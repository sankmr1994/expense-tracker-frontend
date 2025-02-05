export const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
});

export const inrPrice = {
  type: "number",
  width: 150,
  valueFormatter: (value) => currencyFormatter.format(value),
  cellClassName: "font-tabular-nums",
};
