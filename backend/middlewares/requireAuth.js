import jwt from 'jsonwebtoken';

const requireAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ success: false, message: "No token provided" });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;  
    console.log("User decoded from token:", req.user);
    next();  
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default requireAuth;
