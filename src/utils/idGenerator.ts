import { v4 as uuidv4 } from 'uuid';

/**
 * Generates a unique identifier using UUID v4
 * @returns {string} A unique identifier string
 */
export const generateUniqueId = (): string => {
    return uuidv4();
}; 