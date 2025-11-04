// Importation des modèles nécessaires
import TrajetModel from "../models/trajetModel.js";
import UserModel from "../models/userModel.js";

// Je crée la classe AdminController qui gère le tableau de bord 
export default class AdminController {
  constructor() {}

  // J'initialise le tableau de bord administrateur 
  initializeAdminDashboard() {
    console.log("[admin] Initialisation du tableau de bord");

    this.updateDailyStatistics();       // Je mets à jour les statistiques quotidiennes
    this.displayUserTable();            // J’affiche la liste des utilisateurs et employés
    this.handleEmployeeCreationForm();  // Je gère la création d’un nouvel employé
    this.handleAdminLogout();           // Je gère la déconnexion
  }

  // Gère la déconnexion de l’administrateur 
  handleAdminLogout() {
    const logoutButton = document.getElementById("logoutBtn");
    if (!logoutButton) return;

    logoutButton.addEventListener("click", async () => {
      const { default: AuthController } = await import("../controllers/authController.js");
      new AuthController().logout();
    });
  }

  // Je mets à jour les statistiques du jour sur les trajets et crédits 
  updateDailyStatistics() {
    const allTrajets = TrajetModel.getAll();
    const todayDate = new Date().toISOString().split("T")[0];

    const todaysTrajets = allTrajets.filter(trajet => trajet.date === todayDate);
    const totalCredits = todaysTrajets.reduce(
      (sum, trajet) => sum + (Number(trajet.prix) || 0),
      0
    );

    const trajetsCountElement = document.getElementById("trajetsCount");
    const creditsCountElement = document.getElementById("creditsCount");

    if (trajetsCountElement) trajetsCountElement.textContent = todaysTrajets.length;
    if (creditsCountElement) creditsCountElement.textContent = `${totalCredits.toFixed(2)} crédits`;
  }

  // J’affiche tous les utilisateurs et employés dans un tableau 
  displayUserTable() {
    const tableBody = document.querySelector("#adminUsers tbody");
    if (!tableBody) return;

    const allUsers = UserModel.getAll();
    const roleOrder = ["Utilisateur", "Employé"];

    // Je trie les utilisateurs par rôle
    allUsers.sort((a, b) => roleOrder.indexOf(a.role) - roleOrder.indexOf(b.role));

    // Je génère les lignes HTML du tableau
    tableBody.innerHTML = allUsers.map(user => `
      <tr data-id="${user.id}">
        <td>${user.pseudo || "—"}</td>
        <td>${user.email || "—"}</td>
        <td>${user.motdepasse || "—"}</td>
        <td>${user.role}</td>
        <td>
          <select data-role="${user.id}">
            ${roleOrder.map(role => `
              <option value="${role}" ${role === user.role ? "selected" : ""}>${role}</option>
            `).join("")}
          </select>
        </td>
        <td>
          <button class="btn btn-small" data-toggle-ban="${user.id}">
            ${user.banned ? "Réactiver" : "Suspendre"}
          </button>
        </td>
      </tr>
    `).join("");

    // Gestion du changement de rôle
    this.handleRoleChangeEvents(tableBody);

    // Gestion de la suspension/réactivation
    this.handleBanToggleEvents(tableBody);
  }

  // Gère les événements de modification des rôles
  handleRoleChangeEvents(tableBody) {
    tableBody.querySelectorAll("select[data-role]").forEach(select => {
      select.addEventListener("change", () => {
        const userId = Number(select.dataset.role);
        const newRole = select.value;
        this.updateUserRoleInStorage(userId, newRole);
      });
    });
  }

  // Gère les événements de suspension/réactivation d’un utilisateur
  handleBanToggleEvents(tableBody) {
    tableBody.querySelectorAll("button[data-toggle-ban]").forEach(button => {
      button.addEventListener("click", () => {
        const userId = Number(button.dataset.toggleBan);
        this.toggleUserBanStatusInStorage(userId);
      });
    });
  }

  // Met à jour le rôle d’un utilisateur dans le stockage
  updateUserRoleInStorage(userId, newRole) {
    const users = UserModel.getAll();
    const userIndex = users.findIndex(user => Number(user.id) === userId);
    if (userIndex === -1) return;

    users[userIndex].role = newRole;
    localStorage.setItem("users", JSON.stringify(users));
    this.displayUserTable();
  }

  // Bascule le statut de suspension d’un utilisateur
  toggleUserBanStatusInStorage(userId) {
    const users = UserModel.getAll();
    const userIndex = users.findIndex(user => Number(user.id) === userId);
    if (userIndex === -1) return;

    users[userIndex].banned = !users[userIndex].banned;
    localStorage.setItem("users", JSON.stringify(users));
    this.displayUserTable();
  }

  // Gestion du formulaire et création d’un nouvel employé 
  handleEmployeeCreationForm() {
    const form = document.getElementById("createEmployeeForm");
    const alertBox = document.getElementById("createEmpAlert");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const pseudo = document.getElementById("empPseudo")?.value.trim();
      const email = document.getElementById("empEmail")?.value.trim();
      const password = document.getElementById("empPwd")?.value.trim();

      // Vérifie que tous les champs sont remplis
      if (!pseudo || !email || !password) {
        this.showAlertMessage(alertBox, "Tous les champs sont obligatoires.", "error");
        return;
      }

      const users = UserModel.getAll();

      // Vérifie si l’email est déjà utilisé
      const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
      if (emailExists) {
        this.showAlertMessage(alertBox, "Cet email est déjà utilisé.", "error");
        return;
      }

      // Crée le nouvel employé
      const newEmployee = {
        id: users.length ? Math.max(...users.map(u => Number(u.id))) + 1 : 1,
        pseudo,
        email,
        motdepasse: password,
        role: "Employé",
        credits: 0,
        reservations: [],
        banned: false
      };

      users.push(newEmployee);
      localStorage.setItem("users", JSON.stringify(users));

      this.showAlertMessage(alertBox, "Employé créé avec succès", "success");
      form.reset();
      this.displayUserTable();

      // Masque le message après quelques secondes
      setTimeout(() => {
        if (alertBox) alertBox.style.display = "none";
      }, 3000);
    });
  }

  // Affiche une alerte d’erreur ou de succès
  showAlertMessage(alertBox, message, type) {
    if (!alertBox) return;
    alertBox.className = `alert ${type}`;
    alertBox.textContent = message;
    alertBox.style.display = "block";
  }
}
