// Importation des contrôleurs nécessaires
import AuthController from "./controllers/authController.js";
import UserController from "./controllers/userController.js";
import CovoiturageController from "./controllers/covoiturageController.js";
import DetailController from "./controllers/detailController.js";
import EmployeController from "./controllers/employeController.js";
import AdminController from "./controllers/adminController.js";
import { getCurrentUser } from "./utils/auth.js";

// Je configure la barre de navigation en fonction du statut de connexion de l’utilisateur
function setupNav() {
  const session = getCurrentUser();
  const show = (id, visible) => {
    const el = document.getElementById(id);
    if (el) el.style.display = visible ? "" : "none";
  };

  const logged = !!session;

  // Je gère l’affichage des liens selon la connexion
  show("navLogin", !logged);
  show("navRegister", !logged);
  show("navLogout", logged);

  // Je gère l’affichage des liens selon le rôle de l’utilisateur
  show("navProfile", logged && session?.role === "Utilisateur");
  show("navEmploye", logged && session?.role === "Employé");
  show("navAdmin", logged && session?.role === "Admin");

  // Je gère la déconnexion depuis le menu
  const logout = document.getElementById("navLogout");
  if (logout) {
    logout.addEventListener("click", () => new AuthController().logout());
  }
}

// J’initialise la navigation et le routage dès que la page est chargée
document.addEventListener("DOMContentLoaded", () => {
  // Je gère le menu burger pour la version mobile
  const burger = document.getElementById("burgerMenu");
  const nav = document.getElementById("navMenu");
  if (burger && nav) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("active");
      nav.classList.toggle("active");
    });
  }

  setupNav();

  // Je détecte la page active via l’attribut data-page
  const page = document.body?.dataset?.page || "";
  console.log("[router] page =", page);

  // Je gère le routage en fonction de la page active
  switch (page) {
    case "login":
      new AuthController().initLogin();
      break;
    case "register":
      new AuthController().initRegister();
      break;
    case "user":
    case "user_profile":
      new UserController().initProfile();
      break;
    case "covoiturages":
      new CovoiturageController().initList();
      break;
    case "detail":
      new DetailController().init();
      break;
    case "employe":
      new EmployeController().initDashboard();
      break;
    case "admin":
    case "admin_profile":
      new AdminController().initDashboard();
      break;
    case "forgot":
      new AuthController().initForgot();
      break;
    case "reset":
      new AuthController().initReset();
      break;
    default:
      console.warn("[router] aucune initialisation pour cette page");
      break;
  }
});
