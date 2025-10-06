// Je crée une fonction pour afficher un message d’alerte temporaire sur la page
export function showAlert(message, type = "info") {
  // Je crée un élément div pour afficher l’alerte
  const alert = document.createElement("div");

  // J’applique les classes nécessaires pour le style (par défaut : info)
  alert.className = `alert ${type}`;
  alert.innerText = message;

  // J’ajoute l’alerte au corps de la page
  document.body.appendChild(alert);

  // Je fais disparaître l’alerte automatiquement après 3 secondes
  setTimeout(() => alert.remove(), 3000);
}
