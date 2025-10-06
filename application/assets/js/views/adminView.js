// Importation des contrôleurs nécessaires
import AdminController from "../controllers/adminController.js";
import AuthController from "../controllers/authController.js";

// Je crée la classe AdminView pour gérer l’affichage du tableau de bord administrateur
export default class AdminView {
  constructor() {
    // Je prépare les contrôleurs nécessaires : admin et authentification
    this.controller = new AdminController();
    this.auth = new AuthController();
  }

  // J’initialise la vue du tableau de bord administrateur
  init() {
    console.log("[adminView] Initialisation du tableau de bord admin...");

    // Je vérifie que la session actuelle appartient bien à un administrateur
    const session = JSON.parse(localStorage.getItem("sessionUser"));
    if (!session || session.role !== "Admin") {
      alert("Accès réservé à l'administrateur !");
      window.location.href = "./login.php";
      return;
    }

    // J’initialise le tableau de bord via le contrôleur admin
    this.controller.initDashboard();

    // Je gère le bouton de déconnexion de l’administrateur
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => this.auth.logout());
    }
  }
}
