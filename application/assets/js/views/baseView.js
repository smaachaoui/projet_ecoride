// Je crée la classe BaseView qui contient des utilitaires communs pour manipuler le DOM
export default class BaseView {

  // Je récupère un élément du DOM par son identifiant
  get(id) {
    return document.getElementById(id);
  }

  // Je sélectionne le premier élément correspondant à un sélecteur CSS
  qs(sel) {
    return document.querySelector(sel);
  }

  qsa(sel) {
    return Array.from(document.querySelectorAll(sel));
  }

  // J’affiche un message temporaire à l’écran (pour une notification)
  showToast(message, type = "success") {
    const div = document.createElement("div");
    div.className = `alert ${type}`;
    div.textContent = message;
    document.body.appendChild(div);
    setTimeout(() => div.remove(), 2500);
  }

  // Je remplace le contenu HTML d’un conteneur donné
  renderHtml(container, html) {
    if (container) container.innerHTML = html;
  }
}
