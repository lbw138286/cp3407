import { randomBytes, scryptSync, timingSafeEqual, createHash } from "node:crypto";

const KEY_LENGTH = 64;

export function validatePassword(password) {
  const value = String(password ?? "");
  const errors = [];
  if (value.length < 8) errors.push("Password must contain at least 8 characters.");
  if (!/[A-Z]/.test(value)) errors.push("Password must contain an uppercase letter.");
  if (!/[a-z]/.test(value)) errors.push("Password must contain a lowercase letter.");
  if (!/[0-9]/.test(value)) errors.push("Password must contain a number.");
  return errors;
}

export function createPasswordRecord(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(String(password), salt, KEY_LENGTH).toString("hex");
  return { salt, hash };
}

export function verifyPassword(password, salt, expectedHash) {
  try {
    const actual = scryptSync(String(password), salt, KEY_LENGTH);
    const expected = Buffer.from(expectedHash, "hex");
    return actual.length === expected.length && timingSafeEqual(actual, expected);
  } catch {
    return false;
  }
}

export function createSessionToken() {
  return randomBytes(32).toString("base64url");
}

export function hashToken(token) {
  return createHash("sha256").update(String(token)).digest("hex");
}
