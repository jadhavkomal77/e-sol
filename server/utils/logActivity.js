import ActivityLog from "../models/ActivityLog.js";

export const logActivity = async (userId, userRole, action, details, ip) => {
  await ActivityLog.create({
    userId,
    userRole,
    action,
    details,
    ip,
  });
};
