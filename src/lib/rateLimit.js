// Simple in-memory rate limiting store
const store = new Map();

export class RateLimiter {
  constructor(windowMs = 60000, maxRequests = 10) {
    this.windowMs = windowMs; // Time window in milliseconds (default: 1 minute)
    this.maxRequests = maxRequests; // Maximum requests per window (default: 10)
  }

  isRateLimited(identifier) {
    const now = Date.now();
    const userRequests = store.get(identifier) || [];

    // Remove old requests outside the time window
    const recentRequests = userRequests.filter(
      timestamp => now - timestamp < this.windowMs
    );

    // Check if user has exceeded the rate limit
    if (recentRequests.length >= this.maxRequests) {
      return true;
    }

    // Add new request timestamp
    recentRequests.push(now);
    store.set(identifier, recentRequests);

    return false;
  }

  getRemainingRequests(identifier) {
    const now = Date.now();
    const userRequests = store.get(identifier) || [];
    const recentRequests = userRequests.filter(
      timestamp => now - timestamp < this.windowMs
    );
    return Math.max(0, this.maxRequests - recentRequests.length);
  }

  getResetTime(identifier) {
    const userRequests = store.get(identifier) || [];
    if (userRequests.length === 0) return 0;
    
    const oldestRequest = Math.min(...userRequests);
    return oldestRequest + this.windowMs;
  }
}

// Create a singleton instance
export const rateLimiter = new RateLimiter(); 