export const areQueryStringsEqual = (queryString1, queryString2) => {
  // Decode the query strings
  const decodedQueryString1 = decodeURIComponent(queryString1);
  const decodedQueryString2 = decodeURIComponent(queryString2);

  // Split the query strings into key-value pairs
  const params1 = new URLSearchParams(decodedQueryString1);
  const params2 = new URLSearchParams(decodedQueryString2);

  // Convert the key-value pairs to objects for easy comparison
  const obj1 = {};
  const obj2 = {};

  params1.forEach((value, key) => {
    obj1[key] = value;
  });

  params2.forEach((value, key) => {
    obj2[key] = value;
  });

  // Compare the objects
  const areEqual = JSON.stringify(obj1) === JSON.stringify(obj2);

  return areEqual;
};
export const createQueryString = (searchParams, params) => {
  const newSearchParams = new URLSearchParams(searchParams);

  for (const [key, value] of Object.entries(params)) {
    if (value === null) {
      newSearchParams.delete(key);
    } else {
      const urlEncodedValue = encodeURIComponent(value);
      newSearchParams.set(key, String(urlEncodedValue));
    }
  }

  return newSearchParams.toString();
};
