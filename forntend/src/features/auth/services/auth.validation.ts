export const validateEmail = (email: string): string => {
  const value = email.trim();

  if (!value) return 'Email is required';


  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(value)) {
    return 'Please enter a valid email';
  }


  if (value.includes('..')) {
    return 'Email cannot contain consecutive dots';
  }


  if (value.length > 254) {
    return 'Email is too long';
  }

  return '';
};


export const validatePassword = (password: string): string => {
  const value = password.trim();

  if (!value) return 'Password is required';

  if (value.length < 8) {
    return 'Password must be at least 8 characters';
  }

  if (!/[A-Z]/.test(value)) {
    return 'Password must include at least 1 uppercase letter';
  }

  if (!/[0-9]/.test(value)) {
    return 'Password must include at least 1 number';
  }

  return '';
};

export const validateName = (name: string): string => {
  const value = name.trim();

  if (!value) return 'Name is required';

  if (value.length < 3) {
    return 'Name must be at least 3 characters';
  }


  if (!/^[A-Za-z ]+$/.test(value)) {
    return 'Name can only contain letters and spaces';
  }

  if (/\s{2,}/.test(value)) {
    return 'Name cannot contain multiple spaces';
  }

  return '';
};
 
 