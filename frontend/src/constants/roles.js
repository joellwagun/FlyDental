export const ROLES = {
  ADMIN: 'admin',
  CLINIC: 'clinic',
  USER: 'user'
};

export const getNormalizedRole = (role) => {
  const roleStr = String(role || '').trim().toLowerCase();
  
  // Validate against known roles
  if (!Object.values(ROLES).includes(roleStr)) {
    console.warn(`Unknown role detected: ${roleStr}. Defaulting to 'user'`);
    return ROLES.USER;
  }
  
  return roleStr;
};