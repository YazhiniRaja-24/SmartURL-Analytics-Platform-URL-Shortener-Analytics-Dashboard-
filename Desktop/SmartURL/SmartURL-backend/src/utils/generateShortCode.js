// import jwt from "jsonwebtoken";

// const generateToken = (id) => {
//   return jwt.sign(
//     { id },
//     process.env.JWT_SECRET,
//     {
//       expiresIn: "7d",
//     }
//   );
// };

// export default generateToken;
import { nanoid } from "nanoid";

const generateShortCode = () => {
  return nanoid(7);
};

export default generateShortCode;