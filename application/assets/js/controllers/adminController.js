// Importation des modèles nécessaires
import TrajetModel from "../models/trajetModel.js";
import UserModel from "../models/userModel.js";

// Je crée la classe AdminController qui gère le tableau de bord 
export default class AdminController {
  constructor() {}

  // J'initialise le tableau de bord administrateur 
  initDashboard() {
    console.log("[admin] init dashboard");

    this.updateStats();          // Je mets à jour les statistiques
    this.renderUsers();          // J’affiche les utilisateurs et employés
    this.setupCreateEmployee();  // Je gère la création d’un nouvel employé

    // Je gère la déconnexion de l’administrateur (Vue + Contrôleur)
    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        import("../controllers/authController.js").then(module => {
          const AuthController = module.default;
          new AuthController().logout();
        });
      });
    }
  }

  // Je mets à jour les statistiques du jour sur les trajets et crédits 
  updateStats() {
    const trajets = TrajetModel.getAll();
    const today = new Date().toISOString().split("T")[0];

    const trajetsDuJour = trajets.filter(t => t.date === today);
    const totalCredits = trajetsDuJour.reduce(
      (sum, t) => sum + (Number(t.prix) || 0),
      0
    );

    const trajetsCount = document.getElementById("trajetsCount");
    const creditsCount = document.getElementById("creditsCount");

    if (trajetsCount) trajetsCount.textContent = trajetsDuJour.length;
    if (creditsCount) creditsCount.textContent = `${totalCredits.toFixed(2)} crédits`;
  }

  // J’affiche tous les utilisateurs et employés dans un tableau 
  renderUsers() {
    const tbody = document.querySelector("#adminUsers tbody");
    if (!tbody) return;

    const users = UserModel.getAll();
    const roles = ["Utilisateur", "Employé"];

    // Je trie les utilisateurs par rôle
    users.sort((a, b) => roles.indexOf(a.role) - roles.indexOf(b.role));

    // Je génère les lignes HTML du tableau
    tbody.innerHTML = users.map(u => `
      <tr data-id="${u.id}">
        <td>${u.pseudo || "—"}</td>
        <td>${u.email || "—"}</td>
        <td>${u.motdepasse || "—"}</td>
        <td>${u.role}</td>
        <td>
          <select data-role="${u.id}">
            ${roles.map(r => `<option value="${r}" ${r === u.role ? "selected" : ""}>${r}</option>`).join("")}
          </select>
        </td>
        <td>
          <button class="btn btn-small" data-suspend="${u.id}">
            ${u.banned ? "Réactiver" : "Suspendre"}
          </button>
        </td>
      </tr>
    `).join("");

    // Je gère la modification des rôles 
    tbody.querySelectorAll("select[data-role]").forEach(sel => {
      sel.addEventListener("change", () => {
        const id = Number(sel.dataset.role);
        const nextRole = sel.value;
        const all = UserModel.getAll();
        const idx = all.findIndex(u => Number(u.id) === id);
        if (idx === -1) return;

        all[idx].role = nextRole;
        localStorage.setItem("users", JSON.stringify(all));
        this.renderUsers();
      });
    });

    // Je gère la suspension ou réactivation d’un utilisateur (Contrôleur)
    tbody.querySelectorAll("button[data-suspend]").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = Number(btn.dataset.suspend);
        const all = UserModel.getAll();
        const idx = all.findIndex(u => Number(u.id) === id);
        if (idx === -1) return;

        all[idx].banned = !all[idx].banned;
        localStorage.setItem("users", JSON.stringify(all));
        this.renderUsers();
      });
    });
  }

  // Je gère le formulaire de création d’un nouvel employé (Vue + Contrôleur)
  setupCreateEmployee() {
    const form = document.getElementById("createEmployeeForm");
    const alertBox = document.getElementById("createEmpAlert");

    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const pseudo = document.getElementById("empPseudo")?.value.trim();
      const email = document.getElementById("empEmail")?.value.trim();
      const pwd = document.getElementById("empPwd")?.value.trim();

      // Je vérifie que tous les champs sont remplis
      if (!pseudo || !email || !pwd) {
        if (alertBox) {
          alertBox.className = "alert error";
          alertBox.textContent = "Tous les champs sont obligatoires.";
          alertBox.style.display = "block";
        }
        return;
      }

      // Je vérifie que l’email n’est pas déjà utilisé
      const users = UserModel.getAll();
      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        if (alertBox) {
          alertBox.className = "alert error";
          alertBox.textContent = "Cet email est déjà utilisé.";
          alertBox.style.display = "block";
        }
        return;
      }

      // Je crée le nouvel employé (Modèle)
      const id = users.length ? Math.max(...users.map(u => Number(u.id))) + 1 : 1;
      const newEmp = {
        id,
        pseudo,
        email,
        motdepasse: pwd,
        role: "Employé",
        credits: 0,
        reservations: [],
        banned: false
      };

      users.push(newEmp);
      localStorage.setItem("users", JSON.stringify(users));

      // J’affiche un message de confirmation
      if (alertBox) {
        alertBox.className = "alert success";
        alertBox.textContent = "Employé créé avec succès";
        alertBox.style.display = "block";
      }

      // Je vide le formulaire et rafraîchis la liste
      form.reset();
      this.renderUsers();

      // Je masque le message après quelques secondes
      setTimeout(() => {
        if (alertBox) alertBox.style.display = "none";
      }, 3000);
    });
  }
}
