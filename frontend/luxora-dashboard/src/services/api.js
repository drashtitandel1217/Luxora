const JAVA_BASE_URL = 'http://localhost:8080/api/analytics';
const AI_BASE_URL = 'http://127.0.0.1:8000'; // FastAPI

/**
 * Common fetch wrapper
 */
async function apiFetch(baseUrl, endpoint) {
    try {
        const response = await fetch(`${baseUrl}${endpoint}`);
        if (!response.ok) throw new Error(`Error: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`🔴 API Error at ${endpoint}:`, error);
        return []; // Return empty array to prevent chart crashes
    }
}

export const apiService = {
    // --- SPRING BOOT ENDPOINTS ---
    getSalesTrend: () => apiFetch(JAVA_BASE_URL, '/sales-trend'),
    getTopCategories: () => apiFetch(JAVA_BASE_URL, '/top-categories'),
    getOrdersPerDay: () => apiFetch(JAVA_BASE_URL, '/orders-per-day'),
    getOrdersByCategory: () => apiFetch(JAVA_BASE_URL, '/orders-by-category'),
    getSummary: () => apiFetch(JAVA_BASE_URL, '/summary'),

    // --- FASTAPI ENDPOINTS ---
    getForecast: () => apiFetch(AI_BASE_URL, '/forecast'),

    // 🟢 ADD THESE TWO FUNCTIONS:
    // For the Buyer Dashboard Grid
    getProducts: () => apiFetch(AI_BASE_URL, '/api/products'),
    
    // For the Merchant Inventory Table
    getMerchantProducts: () => apiFetch(AI_BASE_URL, '/api/merchant/products'),
};