
// Je définis la clé utilisée pour stocker les avis dans le localStorage
const KEY = "reviews";

// Je charge les avis depuis le localStorage
function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

// Je sauvegarde les avis dans le localStorage
function save(list) {
  localStorage.setItem(KEY, JSON.stringify(list));
}

// Je crée la classe ReviewModel pour gérer les avis et leur modération
export default class ReviewModel {

  // J’ajoute un nouvel avis et je lui attribue un identifiant unique
  static add(review) {
    const all = load();
    const nextId = all.length ? Math.max(...all.map(r => r.id || 0)) + 1 : 1;
    const newReview = { ...review, id: nextId };
    all.push(newReview);
    save(all);
    return newReview;
  }

  // Je récupère les avis en attente de validation
  static pending() {
    return load().filter(r => r.status === "pending");
  }

  // Je récupère les avis signalés comme problématiques
  static flagged() {
    return load().filter(r => r.bad === true);
  }

  // J’approuve un avis en modifiant son statut
  static approve(id) {
    const all = load();
    const review = all.find(r => Number(r.id) === Number(id));
    if (!review) return;
    review.status = "approved";
    save(all);
  }

  // Je rejette un avis en modifiant son statut
  static reject(id) {
    const all = load();
    const review = all.find(r => Number(r.id) === Number(id));
    if (!review) return;
    review.status = "rejected";
    save(all);
  }
}
