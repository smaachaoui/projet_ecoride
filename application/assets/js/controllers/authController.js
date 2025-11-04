// Importations des modèles et vues nécessaires
import UserModel from "../models/userModel.js";
import AuthView from "../views/authView.js";

import { setCurrentUser, clearCurrentUser } from "../utils/auth.js";
import { validatePassword } from "../utils/validation.js";

import ResetModel from "../models/resetModel.js";

import { adminData } from "../../data/admin.js";
import { employesData } from "../../data/employe.js";

// Je crée la classe AuthController et j'initialise la vue
export default class AuthController {
  constructor() {
    this.view = new AuthView();
  }

  // Je lance la page de connexion
  initializeLoginPage() {
    console.log("[auth] Initialisation de la page de connexion");

    this.view.bindLogin(({ email, password, alertBox }) => {
      if (this.handleAdminLogin(email, password, alertBox)) return;
      if (this.handleEmployeeLogin(email, password, alertBox)) return;
      this.handleUserLogin(email, password, alertBox);
    });
  }

  // Je gère la connexion administrateur
  handleAdminLogin(email, password, alertBox) {
    if (email !== adminData.email || password !== adminData.password) return false;

    setCurrentUser({ id: 0, role: "Admin" });
    this.showAlert(alertBox, "Connexion admin réussie", "success");

    const target = location.pathname.includes("/pages/")
      ? "./admin_profile.php"
      : "./pages/admin_profile.php";
    setTimeout(() => (window.location.href = target), 300);
    return true;
  }

  // Je gère la connexion employé
  handleEmployeeLogin(email, password, alertBox) {
    const employe = employesData.find(
      (e) => e.email === email && e.password === password
    );
    if (!employe) return false;

    setCurrentUser({ id: employe.id, role: "Employé" });
    this.showAlert(alertBox, "Connexion employé réussie", "success");

    const target = location.pathname.includes("/pages/")
      ? "./employe_profile.php"
      : "./pages/employe_profile.php";
    setTimeout(() => (window.location.href = target), 300);
    return true;
  }

  // Je gère la connexion utilisateur
  handleUserLogin(email, password, alertBox) {
    const user = UserModel.findByEmail(email);
    if (!user || String(user.motdepasse) !== String(password)) {
      this.showAlert(alertBox, "Identifiants incorrects.", "error");
      return;
    }

    setCurrentUser({ id: user.id, role: user.role });
    this.showAlert(alertBox, "Connexion réussie !", "success");

    const target = location.pathname.includes("/pages/")
      ? "./user_profile.php"
      : "./pages/user_profile.php";
    setTimeout(() => (window.location.href = target), 300);
  }

  // Je lance la page d'inscription
  initializeRegisterPage() {
    console.log("[auth] Initialisation de la page d’inscription");

    this.view.bindRegister(({ pseudo, email, password, alertBox }) => {
      this.handleUserRegistration(pseudo, email, password, alertBox);
    });

    // Je mets à jour la force du mot de passe en temps réel
    setTimeout(() => this.initializePasswordStrengthMeter(), 0);
  }

  // Je gère l’inscription utilisateur
  handleUserRegistration(pseudo, email, password, alertBox) {
    const pwdInput = document.getElementById("password");
    const confirmPwdInput =
      document.getElementById("confirmPassword") ||
      document.getElementById("passwordConfirm");

    const pwd = pwdInput?.value || password || "";
    const confirmPwd = confirmPwdInput?.value || "";

    if (pwd !== confirmPwd) {
      this.showAlert(alertBox, "Les mots de passe ne correspondent pas.", "error");
      return;
    }

    const { valid, errors, score } = validatePassword(pwd, { email, pseudo });
    const meter = document.getElementById("pwdMeter");
    const hint = document.getElementById("passwordHint");

    if (meter) meter.value = score;
    if (!valid) {
      this.showAlert(alertBox, `Mot de passe insuffisant : ${errors.join(" · ")}`, "error");
      if (hint) hint.textContent = "Utilisez 12+ caractères, mélangez maj/min/chiffres/spéciaux.";
      return;
    }

    const users = UserModel.getAll();
    const emailAlreadyUsed = users.some(
      (u) => (u.email || "").toLowerCase() === String(email).toLowerCase()
    );
    if (emailAlreadyUsed) {
      this.showAlert(alertBox, "Un compte existe déjà avec cet email.", "error");
      return;
    }

    const newId = users.length ? Math.max(...users.map((u) => Number(u.id))) + 1 : 1;
    const newUser = {
      id: newId,
      pseudo,
      email,
      motdepasse: pwd,
      role: "Utilisateur",
      credits: 20,
      reservations: [],
    };

    UserModel.save(newUser);
    setCurrentUser({ id: newId, role: "Utilisateur" });
    this.showAlert(alertBox, "Inscription réussie !", "success");

    setTimeout(() => (window.location.href = "./user_profile.php"), 300);
  }

  // Je mets à jour la force du mot de passe
  initializePasswordStrengthMeter() {
    const passwordInput = document.getElementById("password");
    const emailInput = document.getElementById("email");
    const pseudoInput = document.getElementById("pseudo");
    const meter = document.getElementById("pwdMeter");
    const hint = document.getElementById("passwordHint");

    const updateStrength = () => {
      const passwordValue = passwordInput?.value || "";
      const { score } = validatePassword(passwordValue, {
        email: emailInput?.value,
        pseudo: pseudoInput?.value,
      });
      if (meter) meter.value = score;
      if (hint)
        hint.textContent =
          score >= 4 ? "Mot de passe fort" : "Renforcez votre mot de passe";
    };

    [passwordInput, emailInput, pseudoInput].forEach((el) =>
      el?.addEventListener("input", updateStrength)
    );
  }

  // Je lance la page mot de passe oublié
  initializeForgotPasswordPage() {
    console.log("[auth] Initialisation de la page de réinitialisation (oubli)");

    this.view.bindForgot(({ email, alertBox }) => {
      const user = UserModel.findByEmail(email);
      if (!user) {
        this.showAlert(alertBox, "Aucun compte avec cet email.", "error");
        return;
      }

      const token = ResetModel.create(user.id);
      this.showAlert(
        alertBox,
        `Lien de réinitialisation généré (démo) : <a href="./reset_password.php?token=${token}">Réinitialiser</a>`,
        "success",
        true
      );
    });
  }

  // Je lance la page de réinitialisation du mot de passe
  initializeResetPasswordPage() {
    console.log("[auth] Initialisation de la page de réinitialisation du mot de passe");

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      const box = document.getElementById("resetAlert");
      this.showAlert(box, "Lien invalide.", "error");
      return;
    }

    this.view.bindReset(({ password, password2, alertBox }) => {
      this.handlePasswordReset(token, password, password2, alertBox);
    });
  }

  // Je gère la réinitialisation du mot de passe
  handlePasswordReset(token, password, confirmPassword, alertBox) {
    if (password !== confirmPassword) {
      this.showAlert(alertBox, "Les mots de passe ne correspondent pas.", "error");
      return;
    }

    const { valid, errors, score } = validatePassword(password, {});
    const meter = document.getElementById("pwdMeter");
    const hint = document.getElementById("passwordHint");

    if (meter) meter.value = score;
    if (!valid) {
      this.showAlert(
        alertBox,
        `Mot de passe insuffisant : ${errors.join(" · ")}`,
        "error"
      );
      if (hint)
        hint.textContent = "Utilisez 12+ caractères, mélangez maj/min/chiffres/spéciaux.";
      return;
    }

    const payload = ResetModel.consume(token);
    if (!payload) {
      this.showAlert(alertBox, "Lien expiré ou déjà utilisé.", "error");
      return;
    }

    const user = UserModel.findById(payload.userId);
    if (!user) {
      this.showAlert(alertBox, "Compte introuvable.", "error");
      return;
    }

    user.motdepasse = password;
    UserModel.save(user);
    this.showAlert(
      alertBox,
      "Mot de passe mis à jour ! <a href='./login.php'>Se connecter</a>",
      "success",
      true
    );
  }

  // Je gère la déconnexion
  logout() {
    clearCurrentUser();
    const redirectTarget = location.pathname.includes("/pages/")
      ? "../index.php"
      : "./index.php";
    window.location.href = redirectTarget;
  }

  // J'affiche une alerte d’information, de succès ou d’erreur
  showAlert(alertBox, message, type = "info", isHTML = false) {
    if (!alertBox) return;
    alertBox.className = `alert ${type}`;
    if (isHTML) alertBox.innerHTML = message;
    else alertBox.textContent = message;
  }
}
