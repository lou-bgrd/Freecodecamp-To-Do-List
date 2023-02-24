export function sanitizeInput(input) {
    // Enlever les caractères spéciaux dangereux
    input = input.replace(/[^a-zA-Z0-9\u00C0-\u00FF\-\.\@\_ ]/g, "");
    // Enlever les espaces multiples
    input = input.replace(/\s\s+/g, " ");
    // Enlever les espaces en début et fin de chaîne
    input = input.trim();
    return input;
}