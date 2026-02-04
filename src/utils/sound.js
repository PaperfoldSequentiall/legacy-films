export const isSoundUnlocked = () =>
  localStorage.getItem("soundEnabled") === "true";

export const unlockSound = () =>
  localStorage.setItem("soundEnabled", "true");
