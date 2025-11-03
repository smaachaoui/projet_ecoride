// Importations des modèles et vues nécessaires

import UserModel from "../models/userModel.js";
import AuthView from "../views/authView.js";

import { setCurrentUser, clearCurrentUser } from "../utils/auth.js";
import { validatePassword } from "../utils/validation.js";

import ResetModel from "../models/resetModel.js";

import { adminData } from "../../data/admin.js";
import { employesData } from "../../data/employe.js";

// Je créer la classe AuthController et j'initialise la vue
export default class AuthController {
  constructor() { this.view = new AuthView(); }



    // J'initialise la page de connexion
    initLogin() {
      console.log("[auth] init login");



      
      this.view.bindLogin(({ email, password, alertBox }) => {
      // Vérification ADMIN
      if (email === adminData.email && password === adminData.password) {
        setCurrentUser({ id: 0, role: "Admin" });
        if (alertBox) {
          alertBox.textContent = "Connexion admin réussie ";
          alertBox.className = "alert success";
        }
        const target = location.pathname.includes("/pages/")
          ? "./admin_profile.php"
          : "./pages/admin_profile.php";
        setTimeout(() => window.location.href = target, 300);
        return;
      }

      // Vérification EMPLOYÉ
      const employe = employesData.find(
        (e) => e.email === email && e.password === password
      );
      if (employe) {
        setCurrentUser({ id: employe.id, role: "Employé" });
        if (alertBox) {
          alertBox.textContent = "Connexion employé réussie ";
          alertBox.className = "alert success";
        }
        const target = location.pathname.includes("/pages/")
          ? "./employe_profile.php"
          : "./pages/employe_profile.php";
        setTimeout(() => window.location.href = target, 300);
        return;
      }

      // Vérification UTILISATEUR CLASSIQUE
      const user = UserModel.findByEmail(email);
      if (!user || String(user.motdepasse) !== String(password)) {
        if (alertBox) {
          alertBox.textContent = "Identifiants incorrects.";
          alertBox.className = "alert error";
        }
        return;
      }

      setCurrentUser({ id: user.id, role: user.role });
      if (alertBox) {
        alertBox.textContent = "Connexion réussie !";
        alertBox.className = "alert success";
      }

      const target = location.pathname.includes("/pages/")
        ? "./user_profile.php"
        : "./pages/user_profile.php";
      setTimeout(() => window.location.href = target, 300);
    });

  }


  initRegister() {
    console.log("[auth] init register");
    this.view.bindRegister(({ pseudo, email, password, alertBox }) => {
      const pwdInput = document.getElementById("password");
      const pwd2Input = document.getElementById("confirmPassword") || document.getElementById("passwordConfirm");
      const hint = document.getElementById("passwordHint");
      const meter = document.getElementById("pwdMeter");
      const pwd = pwdInput?.value || password || "";
      const pwd2 = pwd2Input?.value || "";
      if (pwd !== pwd2) { if (alertBox) { alertBox.className="alert error"; alertBox.textContent="Les mots de passe ne correspondent pas."; } return; }
      const { valid, errors, score } = validatePassword(pwd, { email, pseudo });
      if (meter) meter.value = score;
      if (!valid) {
        const msg = "Mot de passe insuffisant : " + errors.join(" · ");
        if (alertBox) { alertBox.className="alert error"; alertBox.textContent = msg; }
        if (hint) hint.textContent = "Utilisez 12+ caractères, mélangez maj/min/chiffres/spéciaux.";
        return;
      }
      const users = UserModel.getAll();
      if (users.some(u => (u.email || "").toLowerCase() === String(email).toLowerCase())) {
        if (alertBox) { alertBox.className = "alert error"; alertBox.textContent = "Un compte existe déjà avec cet email."; }
        return;
      }
      const newId = users.length ? Math.max(...users.map(u => Number(u.id))) + 1 : 1;
      const newUser = { id: newId, pseudo, email, motdepasse: pwd, role: "Utilisateur", credits: 20, reservations: [] };
      UserModel.save(newUser);
      setCurrentUser({ id: newId, role: "Utilisateur" });
      if (alertBox) { alertBox.textContent = "Inscription réussie !"; alertBox.className = "alert success"; }
      setTimeout(() => window.location.href = "./user_profile.php", 300);
    });

    const hook = () => {
      const pwd = document.getElementById("password");
      const email = document.getElementById("email");
      const pseudo = document.getElementById("pseudo");
      const meter = document.getElementById("pwdMeter");
      const hint = document.getElementById("passwordHint");
      const update = () => {
        const val = pwd?.value || "";
        const { score } = validatePassword(val, { email: email?.value, pseudo: pseudo?.value });
        if (meter) meter.value = score;
        if (hint) hint.textContent = score >= 4 ? "Mot de passe fort " : "Renforcez votre mot de passe";
      };
      if (pwd) pwd.addEventListener("input", update);
      if (email) email.addEventListener("input", update);
      if (pseudo) pseudo.addEventListener("input", update);
    };
    setTimeout(hook, 0);
  }

  logout() {
    clearCurrentUser();
    const toRoot = location.pathname.includes("/pages/") ? "../index.php" : "./index.php";
    window.location.href = toRoot;
  }

  initForgot(){
    console.log("[auth] init forgot");
    this.view.bindForgot(({ email, alertBox })=>{
      const user = UserModel.findByEmail(email);
      if(!user){
        if(alertBox){ alertBox.className="alert error"; alertBox.textContent="Aucun compte avec cet email."; }
        return;
      }
      const token = ResetModel.create(user.id);
      if(alertBox){
        alertBox.className="alert success";
        alertBox.innerHTML = `Lien de réinitialisation généré (démo) : <a href="./reset_password.php?token=${token}">Réinitialiser</a>`;
      }
    });
  }

  initReset(){
    console.log("[auth] init reset");
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");
    if(!token){
      const box = document.getElementById("resetAlert");
      if(box){ box.className="alert error"; box.textContent="Lien invalide."; }
      return;
    }
    this.view.bindReset(({ password, password2, alertBox })=>{
      if(password !== password2){
        if(alertBox){ alertBox.className="alert error"; alertBox.textContent="Les mots de passe ne correspondent pas."; }
        return;
      }
      const { valid, errors, score } = validatePassword(password, {});
      const meter = document.getElementById("pwdMeter");
      const hint = document.getElementById("passwordHint");
      if (meter) meter.value = score;
      if(!valid){
        if(alertBox){ alertBox.className="alert error"; alertBox.textContent="Mot de passe insuffisant : " + errors.join(" · "); }
        if(hint) hint.textContent = "Utilisez 12+ caractères, mélangez maj/min/chiffres/spéciaux.";
        return;
      }
      const payload = ResetModel.consume(token);
      if(!payload){
        if(alertBox){ alertBox.className="alert error"; alertBox.textContent="Lien expiré ou déjà utilisé."; }
        return;
      }
      const user = UserModel.findById(payload.userId);
      if(!user){
        if(alertBox){ alertBox.className="alert error"; alertBox.textContent="Compte introuvable."; }
        return;
      }
      user.motdepasse = password;
      UserModel.save(user);
      if(alertBox){
        alertBox.className="alert success";
        alertBox.innerHTML = "Mot de passe mis à jour !<a href='./login.php'>Se connecter</a>";
      }
    });
  }
}
