// utils/camelCase.js

// Function to convert snake_case to PascalCase
const toPascalCase = (str) => {
    return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase()) // Convert underscores followed by a letter
        .replace(/^([a-z])/g, (match) => match.toUpperCase()); // Capitalize the first letter
};

// Recursive function to convert all keys in an object/array to PascalCase
const convertToPascalCase = (data) => {
    if (Array.isArray(data)) {
        return data.map(item => convertToPascalCase(item)); // Recursively apply for arrays
    } else if (typeof data === 'object' && data !== null) {
        return Object.keys(data).reduce((acc, key) => {
            const pascalCaseKey = toPascalCase(key); // Convert the key to PascalCase
            acc[pascalCaseKey] = convertToPascalCase(data[key]); // Recursively apply for nested objects
            return acc;
        }, {});
    }
    return data; // Return the data as is if it's neither an array nor an object
};

export default convertToPascalCase;
