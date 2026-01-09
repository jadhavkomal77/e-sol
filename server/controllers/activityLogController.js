import ActivityLog from "../models/ActivityLog.js";

export const getAllLogs = async (req, res) => {
  try {
    const logs = await ActivityLog.find()
      .populate({
        path: "userId",
        select: "name email phone",
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, logs });
  } catch (error) {
    console.error("LOG FETCH ERROR:", error);
    res.status(500).json({ message: "Failed to fetch logs" });
  }
};


export const clearLogs = async (req, res) => {
  try {
    await ActivityLog.deleteMany({});
    res.json({ message: "All logs cleared" });
  } catch (error) {
    res.status(500).json({ message: "Failed to clear logs" });
  }
};
