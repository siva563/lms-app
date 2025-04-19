// backend/middleware/roleMiddleware.js

exports.isAdmin = (req, res, next) => {
    if (req.user && req.user.role === "admin" || req.user && req.user.role === "superadmin") {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Admins only." });
    }
};

exports.isStudent = (req, res, next) => {
    if (req.user && req.user.role === "student") {
        next();
    } else {
        res.status(403).json({ message: "Access denied. Students only." });
    }
};
