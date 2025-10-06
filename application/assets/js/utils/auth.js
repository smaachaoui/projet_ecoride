//Importation des données dans les fichiers admin.js et employe.js
import { adminData } from "../../data/admin.js";
import { employesData } from "../../data/employe.js";

// Je définis la clé utilisée pour stocker la session utilisateur dans le localStorage
const SESSION_KEY = "sessionUser";

// Je récupère l’utilisateur actuellement connecté depuis le localStorage
export function getCurrentUser() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY)) || null;
  } catch {
    return null;
  }
}

// J’enregistre les informations de l’utilisateur dans le localStorage (connexion)
export function setCurrentUser(user) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
}

// Je supprime les informations de l’utilisateur stockées (déconnexion)
export function clearCurrentUser() {
  localStorage.removeItem(SESSION_KEY);
}

// Je vérifie si un utilisateur est actuellement connecté
export function isLoggedIn() {
  return !!getCurrentUser();
}

// Je gère la connexion d’un utilisateur à partir de son email et mot de passe
export function login(email, password) {
  // Je vérifie si les identifiants correspondent à l’administrateur
  if (email === adminData.email && password === adminData.password) {
    setCurrentUser(adminData);
    return adminData;
  }

  // Je vérifie si les identifiants correspondent à un employé
  const user = employesData.find(
    u => u.email === email && u.password === password
  );

  if (user) {
    setCurrentUser(user);
    return user;
  }

  // Je retourne null si la connexion échoue
  return null;
}
