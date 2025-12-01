// Je définis la clé utilisée pour stocker la session utilisateur
const SESSION_KEY = "sessionUser";

// Utiliser sessionStorage au lieu de localStorage
function loadSession() {
  try {
    const raw = sessionStorage.getItem(SESSION_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveSession(data) {
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(data));
}

export function getCurrentUser() {
  return loadSession();
}

export function setCurrentUser(user) {
  if (!user) {
    clearCurrentUser();
    return;
  }

  // Je ne garde que les infos nécessaires pour l’UI
  const safeUser = {
    id: user.id,
    pseudo: user.pseudo,
    role: user.role,
    credits: user.credits ?? 0,
  };

  saveSession(safeUser);
}

export function clearCurrentUser() {
  sessionStorage.removeItem(SESSION_KEY);
}
