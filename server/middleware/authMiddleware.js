import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const base = req.baseUrl.toLowerCase();
    const path = req.path.toLowerCase();

    // 🌍 Public route skip token check
    if (path.includes("public")) return next();

    let token = null;
    let expectedRole = null;


    // 🔐 SUPERADMIN PROTECTED ROUTES
  
    if (
      base.includes("/api/superadmin") ||
      base.includes("/api/superabout") ||
      base.includes("/api/superhero") ||
      base.includes("/api/superadminservices") ||
      base.includes("/api/superadminproducts") ||
      base.includes("/api/superadminenquiry")||
      base.includes("/api/superadminfeedback")||
      base.includes("/api/superadmincontact")||
      base.includes("/api/superadminfooter")||
      base.includes("/api/superadminnavbar")||
      base.includes("/api/superadminepayment")||
      base.includes("/api/superadminpaymentsetting")
    ) {
      token = req.cookies?.superToken;
      expectedRole = "superadmin";
    }

  
    else if (
      base.includes("/api/admin") ||
      base.includes("/api/about") ||
      base.includes("/api/navbar") ||
      base.includes("/api/products") ||
      base.includes("/api/enquiry") ||
      base.includes("/api/hero") ||
      base.includes("/api/payment") ||
      base.includes("/api/footer") ||
      base.includes("/api/services") ||
      base.includes("/api/feedback") ||
      base.includes("/api/contact")
    ) {
      // token = req.cookies?.adminToken;
      // expectedRole = "admin";
      const authHeader = req.headers.authorization;

if (authHeader && authHeader.startsWith("Bearer ")) {
  token = authHeader.split(" ")[1];   
} else {
  token = req.cookies?.adminToken;   
}

expectedRole = "admin";

    }

    else {
      return next();
    }


    if (!token) {
      return res.status(401).json({ message: "Please Login First!" });
    }

 
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    if (decoded.role !== expectedRole) {
      return res.status(403).json({ message: "Access Denied" });
    }

    req.user = decoded;
    next();
  } catch (err) {
    console.error("AUTH ERROR:", err.message);
    return res.status(401).json({ message: "Invalid or Expired Token" });
  }
};

export const roleCheck = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) {
    return res.status(403).json({ message: "Access Denied" });
  }
  next();
};

export const adminOnly = roleCheck("admin");
export const superAdminOnly = roleCheck("superadmin");
export const adminAndSuper = roleCheck("admin", "superadmin");
