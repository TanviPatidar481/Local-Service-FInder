/**
 * Determines if the currently logged-in user owns the profile being viewed.
 * TODO: replace with JWT decode / auth context when backend is ready.
 *
 * localStorage shape:
 *   "authUser"   → { id, role }
 *   "providerId" → string
 */
export const useProfileOwner = (profileId) => {
  const authUser   = JSON.parse(localStorage.getItem("authUser")   || "null");
  const providerId = localStorage.getItem("providerId")            || null;

  const isOwner =
    profileId === "me" ||
    (providerId && providerId === profileId) ||
    (authUser?.id && authUser.id === profileId);

  return { isOwner, authUser };
};
