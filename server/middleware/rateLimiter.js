import rateLimit from "express-rate-limit";

// 🛑 Too many login attempts protection
export const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Only 5 attempts allowed
  message: {
    success: false,
    message: "Too many failed login attempts. Try again later.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// 🔐 Sensitive routes protection (password change etc.)
export const sensitiveLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 3,
  message: {
    success: false,
    message: "Too many attempts. Please wait before trying again.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
