import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function truncateText(text: string, maxLength: number = 100) {
    if (text === null || undefined) return ""
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

export function formatDate(dateString: string) {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export function formatPrice(price: number) {
    return `Rp. ${parseFloat(price).toLocaleString('id-ID')}`
}
