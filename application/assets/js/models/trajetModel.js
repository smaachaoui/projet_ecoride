// Importation des conducteurs depuis le fichier driver.js
import { drivers as seedDrivers } from "../../data/driver.js";

// Clé de stockage locale
const STORAGE_KEY = "driversSeeded";

// Classe de gestion des trajets
export default class TrajetModel {

  // Je vérifie que la liste est valide
  static _isValidList(list) {
    return Array.isArray(list) && list.length > 0 && typeof list[0]?.id !== "undefined";
  }

  // Je charge tous les trajets (et je reseed si besoin)
  static _loadAll() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const list = raw ? JSON.parse(raw) : [];

      if (!this._isValidList(list)) {
        console.warn("[TrajetModel] Re-seeding depuis driver.js (cache vide ou obsolète)");
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedDrivers));
        return [...seedDrivers];
      }

      return list;
    } catch (err) {
      console.error("[TrajetModel] Erreur de lecture du localStorage :", err);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seedDrivers));
      return [...seedDrivers];
    }
  }

  // Je sauvegarde la liste complète dans le localStorage
  static _saveAll(list) {
    if (!Array.isArray(list)) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }

  // Je retourne tous les trajets
  static getAll() {
    return this._loadAll();
  }

  // Je cherche un trajet par son identifiant
  static findById(id) {
    return this._loadAll().find(t => Number(t.id) === Number(id)) || null;
  }

  // Je décrémente le nombre de places d’un trajet
  static decrementPlace(trajetId) {
    const all = this._loadAll();
    const trajet = all.find(t => Number(t.id) === Number(trajetId));

    if (!trajet || trajet.places <= 0) return false;

    trajet.places--;
    this._saveAll(all);
    return true;
  }

  // Je crée un nouveau trajet et je l’ajoute à la liste
  static create(trip) {
    const all = this._loadAll();
    const id = all.length ? Math.max(...all.map(t => Number(t.id) || 0)) + 1 : 1;

    const record = {
      id,
      status: "planned",
      participants: [],
      ...trip,
    };

    all.push(record);
    this._saveAll(all);
    return record;
  }

  // J’ajoute un participant à un trajet
  static addParticipant(trajetId, userId) {
    const all = this._loadAll();
    const trajet = all.find(t => Number(t.id) === Number(trajetId));

    if (!trajet || trajet.places <= 0) return false;

    trajet.participants = Array.isArray(trajet.participants) ? trajet.participants : [];

    if (!trajet.participants.includes(userId)) {
      trajet.participants.push(userId);
      trajet.places--;
    }

    this._saveAll(all);
    return true;
  }

  // Je retire un participant d’un trajet
  static removeParticipant(trajetId, userId) {
    const all = this._loadAll();
    const trajet = all.find(t => Number(t.id) === Number(trajetId));

    if (!trajet) return false;

    trajet.participants = (trajet.participants || []).filter(id => Number(id) !== Number(userId));
    trajet.places++;
    this._saveAll(all);
    return true;
  }

  // Je démarre un trajet
  static start(trajetId) {
    const all = this._loadAll();
    const trajet = all.find(t => Number(t.id) === Number(trajetId));
    if (!trajet) return false;

    trajet.status = "ongoing";
    this._saveAll(all);
    return true;
  }

  // Je termine un trajet
  static finish(trajetId) {
    const all = this._loadAll();
    const trajet = all.find(t => Number(t.id) === Number(trajetId));
    if (!trajet) return false;

    trajet.status = "done";
    this._saveAll(all);
    return true;
  }

  // J’annule un trajet
  static cancelByDriver(trajetId) {
    const all = this._loadAll();
    const trajet = all.find(t => Number(t.id) === Number(trajetId));
    if (!trajet) return false;

    trajet.status = "cancelled";
    this._saveAll(all);
    return true;
  }
}
