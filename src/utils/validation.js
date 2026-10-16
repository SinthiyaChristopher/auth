// ✅ Email validation
export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

// ✅ Password validation
export const validatePassword = (password) => {
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
  return regex.test(password);
};

// ✅ Confirm password
export const validateConfirmPassword = (password, confirm) => {
  return password === confirm;
};

// ✅ Required field
export const validateRequired = (value) => {
  return value && value.trim() !== "";
};

// ✅ Generic form validation
export const validateForm = (fields) => {
  const errors = {};

  if ("email" in fields && !validateEmail(fields.email)) {
    errors.email = "Invalid email format";
  }

  if ("password" in fields && !validatePassword(fields.password)) {
    errors.password =
      "Password must be at least 8 characters, include uppercase, lowercase, number, and special character";
  }

  if ("confirm" in fields && !validateConfirmPassword(fields.password, fields.confirm)) {
    errors.confirm = "Passwords do not match";
  }

  Object.keys(fields).forEach((key) => {
    if (!validateRequired(fields[key])) {
      errors[key] = `${key} is required`;
    }
  });

  return errors;
};