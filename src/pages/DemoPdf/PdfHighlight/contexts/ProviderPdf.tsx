import { createContext, useContext } from 'react';

export interface ProviderPdfType<T> {
    loading: boolean;
}

export const ContextPdf = createContext({});

export function useProviderPdf<T>(): ProviderPdfType<T> {
    const ProviderPdf = useContext(ContextPdf) as ProviderPdfType<T>;
    if (ProviderPdf === undefined) {
        throw new Error('useProviderPdf must be used within useProviderPdf.Provider');
    }
    return ProviderPdf;
}