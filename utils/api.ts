import { supabase } from './supabaseClient';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const getHeaders = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const token = session?.access_token;

    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
};

export const api = {
    get: async (endpoint: string) => {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}${endpoint}`, { headers });
        if (!response.ok) throw new Error('API Request Failed');
        return response.json();
    },

    post: async (endpoint: string, data: any) => {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'POST',
            headers,
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`API Request Failed: ${response.status} ${response.statusText} - ${errorText}`);
        }
        return response.json();
    },

    delete: async (endpoint: string) => {
        const headers = await getHeaders();
        const response = await fetch(`${API_URL}${endpoint}`, {
            method: 'DELETE',
            headers,
        });
        if (!response.ok) throw new Error('API Request Failed');
        return response.json();
    }
};
