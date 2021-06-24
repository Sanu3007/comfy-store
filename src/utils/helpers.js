export const formatPrice = (val) => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(val / 10);
};

export const getUniqueValues = (data, type) => {
  let features = data.map((item) => item[type]);
  if (type === "colors") {
    features = features.flat();
  }
  return ["all", ...new Set(features)];
};
