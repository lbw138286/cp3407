export function validateLoginInput(email, password) {
  const errors = [];
  const normalizedEmail = String(email ?? "").trim().toLowerCase();
  const passwordValue = String(password ?? "");

  if (!normalizedEmail) {
    errors.push("Email is required.");
  }
  if (!normalizedEmail.includes("@")) {
    errors.push("A valid email address is required.");
  }
  if (!passwordValue) {
    errors.push("Password is required.");
  }

  return errors;
}

export async function loginUser({ email, password }, authRepository) {
  const errors = validateLoginInput(email, password);
  if (errors.length > 0) {
    return {
      success: false,
      errors,
      user: null,
      token: null
    };
  }

  if (!authRepository || typeof authRepository.findUserByEmail !== "function") {
    throw new Error("Authentication repository is required.");
  }

  const normalizedEmail = String(email).trim().toLowerCase();
  const user = await authRepository.findUserByEmail(normalizedEmail);

  if (!user || user.password !== password) {
    return {
      success: false,
      errors: ["Invalid email or password."],
      user: null,
      token: null
    };
  }

  return {
    success: true,
    errors: [],
    user: {
      userId: user.userId,
      name: user.name,
      email: user.email
    },
    token: `mock-token-${user.userId}`
  };
}
