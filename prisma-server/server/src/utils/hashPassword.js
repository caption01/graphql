import bcrypt from "bcryptjs";

const hashPassword = (password) => {
  if (password.length < 8) {
    throw new Error("Password must be at less 8 chareacter");
  }

  const hashedPassword = bcrypt.hash(password, 10);

  return hashedPassword;
};

export { hashPassword as default };
