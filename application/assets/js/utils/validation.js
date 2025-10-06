// Je valide la sécurité d’un mot de passe selon plusieurs critères
export function validatePassword(password, { email = "", pseudo = "" } = {}) {
  const errors = [];

  // Je vérifie la longueur minimale
  if (typeof password !== "string" || password.length < 10)
    errors.push("Au moins 10 caractères");

  // Je vérifie la présence de lettres minuscules
  if (!/[a-z]/.test(password))
    errors.push("Au moins une lettre minuscule");

  // Je vérifie la présence de lettres majuscules
  if (!/[A-Z]/.test(password))
    errors.push("Au moins une lettre majuscule");

  // Je vérifie la présence d’au moins un chiffre
  if (!/[0-9]/.test(password))
    errors.push("Au moins un chiffre");

  // Je vérifie qu’il n’y ait pas d’espaces
  if (/\s/.test(password))
    errors.push("Pas d'espaces");

  // Je vérifie la présence d’un caractère spécial
  if (!/[^\w\s]/.test(password))
    errors.push("Au moins un caractère spécial");

  // Je normalise le mot de passe en minuscules pour les comparaisons
  const lower = (password || "").toLowerCase();

  // Je vérifie que le mot de passe ne contient pas l’email de l’utilisateur
  if (email) {
    const prefix = String(email).split("@")[0].toLowerCase();
    if (prefix && prefix.length >= 3 && lower.includes(prefix))
      errors.push("Ne doit pas contenir votre email");
  }

  // Je vérifie qu’il ne contient pas le pseudo de l’utilisateur
  if (pseudo && pseudo.length >= 3 && lower.includes(String(pseudo).toLowerCase()))
    errors.push("Ne doit pas contenir votre pseudo");

  // Je vérifie que le mot de passe n’est pas trop commun
  const common = ["password", "azerty", "qwerty", "123456", "motdepasse", "admin", "welcome"];
  if (common.some(c => lower.includes(c)))
    errors.push("Mot de passe trop commun");

  // Je calcule un score global de sécurité
  let score = 0;
  if (password.length >= 12) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^\w\s]/.test(password)) score++;

  // Je retourne le résultat de la validation avec le score et les erreurs
  return { valid: errors.length === 0, errors, score };
}
