// Importation des données utilisateurs du fichier users.js
import { users as seedUsers } from "../../data/users.js";

// Je définis la clé utilisée pour stocker les utilisateurs dans le localStorage
const STORAGE_KEY = "users";

// Je crée la classe UserModel pour gérer les informations des utilisateurs
export default class UserModel {

  // Je charge tous les utilisateurs depuis le localStorage
  static _loadAll() {
    const raw = localStorage.getItem(STORAGE_KEY);

    // Si aucune donnée n’existe, je copie les utilisateurs du fichier de base
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedUsers));
      return [...seedUsers];
    }

    // Je tente de parser les données, sinon je reviens au jeu de base
    try {
      return JSON.parse(raw);
    } catch {
      return [...seedUsers];
    }
  }

  // Je sauvegarde la liste complète des utilisateurs
  static _saveAll(list) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  // Je retourne tous les utilisateurs
  static getAll() {
    return this._loadAll();
  }

  // Je cherche un utilisateur par son identifiant
  static findById(id) {
    return this._loadAll().find(u => Number(u.id) === Number(id)) || null;
  }

  // Je cherche un utilisateur par son adresse e-mail
  static findByEmail(email) {
    const normalized = String(email || "").toLowerCase();
    return this._loadAll().find(u => (u.email || "").toLowerCase() === normalized) || null;
  }

  // Je sauvegarde un utilisateur (ajout ou mise à jour)
  static save(user) {
    const all = this._loadAll();
    const idx = all.findIndex(u => Number(u.id) === Number(user.id));

    if (idx === -1) {
      all.push(user);
    } else {
      all[idx] = user;
    }

    this._saveAll(all);
    return user;
  }

  // Je débite un certain montant de crédits à un utilisateur
  static debitCredits(userId, amount) {
    const all = this._loadAll();
    const user = all.find(u => Number(u.id) === Number(userId));

    if (!user) return false;

    const next = Number(user.credits || 0) - Number(amount);
    if (next < 0) return false;

    user.credits = next;
    this._saveAll(all);
    return true;
  }

  // J’ajoute une réservation à la liste de l’utilisateur
  static addReservation(userId, reservation) {
    const all = this._loadAll();
    const user = all.find(u => Number(u.id) === Number(userId));

    if (!user) return false;

    if (!Array.isArray(user.reservations)) user.reservations = [];
    user.reservations.push(reservation);

    this._saveAll(all);
    return true;
  }
}
