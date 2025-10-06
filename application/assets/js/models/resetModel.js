// Je définis la clé utilisée pour stocker les jetons de réinitialisation dans le localStorage
const STORAGE_KEY = "resetTokens";

// Je retourne la date et l’heure actuelles en millisecondes
function now() { 
  return Date.now(); 
}

// Je charge tous les jetons enregistrés depuis le localStorage
function load() { 
  try { 
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"); 
  } catch { 
    return []; 
  } 
}

// Je sauvegarde la liste des jetons dans le localStorage
function save(x) { 
  localStorage.setItem(STORAGE_KEY, JSON.stringify(x)); 
}

// Je génère une chaîne aléatoire utilisée comme jeton
function rand(len = 40) {
  const c = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let t = "";
  for (let i = 0; i < len; i++) t += c[Math.floor(Math.random() * c.length)];
  return t;
}

// Je crée la classe ResetModel pour gérer la création et la consommation des jetons de réinitialisation
export default class ResetModel {

  // Je crée un nouveau jeton de réinitialisation pour un utilisateur
  static create(userId, ttlMinutes = 60) {
    const list = load().filter(t => t.expiresAt > now());
    const token = rand(40);
    const expiresAt = now() + ttlMinutes * 60 * 1000;
    list.push({ token, userId: Number(userId), expiresAt });
    save(list);
    return token;
  }

  // Je consomme un jeton valide (et le supprime une fois utilisé)
  static consume(token) {
    const list = load();
    const idx = list.findIndex(t => t.token === token && t.expiresAt > now());
    if (idx === -1) return null;
    const item = list[idx];
    list.splice(idx, 1);
    save(list);
    return item;
  }
}
