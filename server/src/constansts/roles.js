const Roles = {
  SuperAdmin: "super_admin",
  Admin: "admin",
  User: "user",
  Guest: "guest",
};

export function getRoleByUser({ role } = {}) {
  return role || Roles.Guest ;
}

export default Roles;
