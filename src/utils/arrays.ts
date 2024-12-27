/**
 * Function to parse a string into an array of strings
 * @param { string } stackString - The string to parse
 * @returns { string[] } - An array of strings
 **/
export const parseStack =(stackString: string): string[] => {
  try {
    const formattedString = stackString.replace(/'/g, '"');
    const stack = JSON.parse(formattedString);
    
    // Make sure it is an array and contains only strings
    if (Array.isArray(stack) && stack.every(item => typeof item === "string")) {
      return stack;
    } else {
      throw new Error("Formato inválido: no es un arreglo de strings");
    }
  } catch (error) {
    console.error("Error al parsear el campo stack:", error);
    return [];
  }
}