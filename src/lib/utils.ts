import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function normalizeName(name: string): string {
    const words = name.split(/\s+/);

    const normalizedWords = words.map(word => {
        const normalizedWord = word
            .replace(/[éèêëē]/gi, 'e')
            .replace(/[àáâãäåā]/gi, 'a')
            .replace(/[íìîïī]/gi, 'i')
            .replace(/[óòôõöō]/gi, 'o')
            .replace(/[úùûüū]/gi, 'u')
            .replace(/[ç]/gi, 'c')
            .replace(/[ñ]/gi, 'n')
            .replace(/[^a-zA-Z0-9]/g, '');

        if (normalizedWord.length > 0) {
            return normalizedWord.charAt(0).toUpperCase() + normalizedWord.slice(1).toLowerCase();
        }

        return '';
    });

    return normalizedWords.join('');
}

export function encodeButKeepSpaces(str: string): string {
    return encodeURIComponent(str).replace(/%20/g, ' ');
}