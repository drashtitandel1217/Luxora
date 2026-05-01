/** 
 * We use import.meta.env to dynamically pull the API URLs.
 * Locally, it defaults to your development ports.
 * On Render, it will pull the live URLs you set in the dashboard.
 */

const JAVA_BASE_URL = (import.meta.env.VITE_API_URL || 'http://localhost:8080') + '/api/analytics';
const AI_BASE_URL = import.meta.env.VITE_AI_URL || 'http://127.0.0.1:8000';

/**
 * Global fetch wrapper to handle JSON conversion and error logging.
 */
async function apiFetch(baseUrl, endpoint) {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`);
        if (!response.ok) {
            throw new Error(`HTTP Error: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error(`🔴 API Error at ${endpoint}:`, error);
        return []; // Returns empty array to prevent frontend UI crashes
    }
}

export const apiService = {
    // Java Spring Boot Endpoints
    getSalesTrend: () => apiFetch(JAVA_BASE_URL, '/sales-trend'),
    getTopCategories: () => apiFetch(JAVA_BASE_URL, '/top-categories'),
    getOrdersPerDay: () => apiFetch(JAVA_BASE_URL, '/orders-per-day'),
    getOrdersByCategory: () => apiFetch(JAVA_BASE_URL, '/orders-by-category'),
    getSummary: () => apiFetch(JAVA_BASE_URL, '/summary'),

    // Python AI Service Endpoints
    getForecast: () => apiFetch(AI_BASE_URL, '/forecast'),
    getProducts: () => apiFetch(AI_BASE_URL, '/api/products'),
    getMerchantProducts: () => apiFetch(AI_BASE_URL, '/api/merchant/products'),
};