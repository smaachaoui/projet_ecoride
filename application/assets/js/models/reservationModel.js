// Je définis la clé utilisée pour stocker les réservations dans le localStorage
const KEY = "reservations";

// Je crée la classe ReservationModel pour gérer les réservations des utilisateurs
export default class ReservationModel {

  // Je récupère toutes les réservations enregistrées
  static all() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch {
      return [];
    }
  }

  // J’ajoute une nouvelle réservation et je la sauvegarde dans le localStorage
  static add(res) {
    const all = this.all();
    all.push(res);
    localStorage.setItem(KEY, JSON.stringify(all));
    return res;
  }

  // Je récupère toutes les réservations appartenant à un utilisateur donné
  static findByUser(userId) {
    return this.all().filter((r) => r.userId === userId);
  }

  // Je récupère toutes les réservations associées à un trajet spécifique
  static findByTrajet(trajetId) {
    return this.all().filter((r) => r.trajetId === trajetId);
  }
}
