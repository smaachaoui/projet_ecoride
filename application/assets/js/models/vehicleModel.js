// Je gère les véhicules côté front en utilisant le localStorage

// Chaque véhicule contient : { id, userId, marque, modele, couleur, immatriculation, dateImmat, energie, places, prefFumeur, prefAnimal, prefExtras }

const KEY = "vehicles";

// Je charge la liste des véhicules depuis le localStorage
function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

// Je sauvegarde la liste des véhicules dans le localStorage
function save(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

// Je crée la classe VehicleModel pour gérer les véhicules des utilisateurs
export default class VehicleModel {

  // Je récupère tous les véhicules enregistrés
  static getAll() {
    return load();
  }

  // Je récupère tous les véhicules appartenant à un utilisateur
  static findByUser(userId) {
    return load().filter(v => Number(v.userId) === Number(userId));
  }

  // J’ajoute un nouveau véhicule pour un utilisateur
  static addVehicle(userId, data) {
    const all = load();
    const id = all.length ? Math.max(...all.map(v => Number(v.id) || 0)) + 1 : 1;

    // Je construis l’objet véhicule à partir des données fournies
    const newVehicle = {
      id,
      userId,
      marque: data.marque,
      modele: data.modele,
      couleur: data.couleur,
      immatriculation: data.immatriculation || data.plaque,
      dateImmat: data.dateImmat,
      energie: data.energie || "",
      places: Number(data.places) || 1,
      prefFumeur: !!data.prefFumeur,
      prefAnimal: !!data.prefAnimal,
      prefExtras: data.prefExtras || [],
    };

    // J’ajoute le véhicule à la liste et je le sauvegarde
    all.push(newVehicle);
    save(all);
    return newVehicle;
  }

  // Je fournis un alias pour récupérer les véhicules d’un utilisateur
  static getByUserId(userId) {
    return this.findByUser(userId);
  }
}
