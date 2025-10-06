
// Je définis la clé utilisée pour stocker les notifications dans le localStorage
const KEY = "notifications";

// Je charge toutes les notifications depuis le localStorage
function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

// Je sauvegarde les notifications dans le localStorage
function save(x) {
  localStorage.setItem(KEY, JSON.stringify(x));
}

// Je crée la classe NotificationModel pour gérer les notifications utilisateur
export default class NotificationModel {
  
  // J’ajoute une nouvelle notification pour un utilisateur
  static push(userId, message) {
    const all = load();
    all.push({
      id: Date.now(),
      userId,
      message,
      read: false,
      createdAt: new Date().toISOString(),
    });
    save(all);
  }

  // Je récupère toutes les notifications d’un utilisateur donné
  static byUser(userId) {
    return load().filter(n => Number(n.userId) === Number(userId));
  }

  // Je marque toutes les notifications d’un utilisateur comme lues
  static markAllRead(userId) {
    const all = load();
    all.forEach(n => {
      if (Number(n.userId) === Number(userId)) n.read = true;
    });
    save(all);
  }

  // J’ajoute une notification à partir d’un objet de données
  static add(note) {
    const userId = note.userId || 0;
    const message = note.message || "";
    this.push(userId, message);
  }
}
