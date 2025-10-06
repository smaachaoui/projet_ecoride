// Importation de la vue nécessaire
import BaseView from "./baseView.js";

// Je crée la classe AuthView pour gérer les formulaires liés à l’authentification
export default class AuthView extends BaseView {

  // Je relie le formulaire de connexion et j’appelle la fonction onSubmit à la validation
  bindLogin(onSubmit) {
    const form = this.get("loginForm");
    const alertBox = this.get("loginAlert");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = this.get("email")?.value || "";
      const password = this.get("password")?.value || "";
      onSubmit({ email, password, alertBox });
    });
  }

  // Je relie le formulaire d’inscription et j’appelle la fonction onSubmit à la validation
  bindRegister(onSubmit) {
    const form = this.get("registerForm");
    const alertBox = this.get("registerAlert");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const pseudo = this.get("pseudo")?.value || "";
      const email = this.get("email")?.value || "";
      const password = this.get("password")?.value || "";
      onSubmit({ pseudo, email, password, alertBox });
    });
  }

  // Je relie le formulaire de mot de passe oublié et j’appelle la fonction onSubmit
  bindForgot(onSubmit) {
    const form = this.get("forgotForm");
    if (!form) return;

    const alertBox = this.get("forgotAlert");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = this.get("forgotEmail")?.value || "";
      onSubmit({ email, alertBox });
    });
  }

  // Je relie le formulaire de réinitialisation de mot de passe et j’appelle la fonction onSubmit
  bindReset(onSubmit) {
    const form = this.get("resetForm");
    if (!form) return;

    const alertBox = this.get("resetAlert");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const password = this.get("newPassword")?.value || "";
      const password2 = this.get("newPassword2")?.value || "";
      onSubmit({ password, password2, alertBox });
    });
  }
}
