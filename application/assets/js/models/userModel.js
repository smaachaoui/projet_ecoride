import { users as seedUsers } from "../../data/users.js";

let users = [...seedUsers]; // mémoire uniquement

export default class UserModel {
  static all() {
    return users;
  }

  static findByEmail(email) {
    return users.find(u => u.email === email);
  }

  static create({ pseudo, email, motdepasse }) {
    const id = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    const newUser = {
      id,
      pseudo,
      email,
      motdepasse, // front-only, on s'en fiche un peu, ce sera supprimé avec Symfony
      role: "Utilisateur",
      credits: 20,
      reservations: []
    };
    users.push(newUser);
    return newUser;
  }
}
