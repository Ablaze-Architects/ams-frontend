export function setAuth(token, role, user) {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  localStorage.setItem(
    "user",
    JSON.stringify({
      id: user.id || user.admin_id || "",
      name:
        user.admin_name ||
        (user.metadata && user.metadata.display_name) ||
        user.displayName ||
        user.name ||
        "",
      email: user.email || user.admin_email || "",
      avatar:
        user.avatar ||
        (user.admin_profile_picture_key
          ? `/avatars/${user.admin_profile_picture_key}`
          : "/avatars/default.jpg"),
    })
  );
}

export function getUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}

export function getToken() {
  return localStorage.getItem("token");
}

export function getRole() {
  return localStorage.getItem("role");
}

export function clearAuth() {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("user");
}

export async function fetchUserByEmail(email) {
  const response = await fetch(`/api/user/signup?email=${email}`);
  if (!response.ok) throw new Error("Failed to fetch user");
  return response.json();
}
