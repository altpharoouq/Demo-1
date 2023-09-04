// Stolen from somewhere online
const flattenObject = (obj: any, newObj?: any, prefix?: any) => {
  newObj = newObj || {};
  prefix = prefix || "";
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      const type = typeof obj[key];
      const newKey = !!prefix ? prefix + "." + key : key;
      if (type === "string") {
        newObj[newKey] = obj[key];
      } else if (type === "object") {
        flattenObject(obj[key], newObj, newKey);
      }
    }
  }
  return newObj;
};

export default flattenObject;
