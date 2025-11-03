import TrajetModel from "../models/trajetModel.js";
import UserModel from "../models/userModel.js";
import ReservationModel from "../models/reservationModel.js";
import { getCurrentUser } from "../utils/auth.js";
import NotificationModel from "../models/notificationModel.js";

export default class DetailController {
  constructor() {
    this.trajet = null;
  }

  // Je commence par récupérer les paramètres de l’URL
  _params() {
    return new URLSearchParams(window.location.search);
  }

  // Je lance l’initialisation de la page de détail
  init() {
    const id = Number(this._params().get("id"));
    if (!id) return console.warn("Identifiant du trajet manquant");

    this.trajet = TrajetModel.findById(id);
    if (!this.trajet) return console.warn("Trajet introuvable");

    console.log("[detail] trajet =", this.trajet);

    // J’affiche les différentes sections de la page
    this.afficherPhoto();
    this.afficherInfosChauffeur();
    this.afficherInfosTrajet();
    this.afficherVoiture();
    this.afficherPreferences();
    this.afficherAvis();
    this.configurerParticipation();
  }

  // J’affiche ici la photo du chauffeur
  afficherPhoto() {
    const photoEl = document.getElementById("chauffeurPhoto");
    if (!photoEl) return;

    let src = this.trajet.photo?.trim() || "../assets/img/user_picture.png";

    // Je vérifie le type de lien pour ajuster le chemin correctement
    if (src.startsWith("http") || src.startsWith("/")) {
      photoEl.src = src;
    } else {
      photoEl.src = "/assets/img/" + src.split("/").pop();
    }

    console.log("[detail] photo chargée :", photoEl.src);
  }

  // J’affiche ici les informations principales du chauffeur
  afficherInfosChauffeur() {
    const { pseudo, note } = this.trajet;

    const pseudoEl = document.getElementById("chauffeurPseudo");
    const noteEl = document.getElementById("chauffeurNote");

    if (pseudoEl) pseudoEl.textContent = pseudo || "Chauffeur";
    if (noteEl) noteEl.textContent = `Note : ${note ?? "N/A"}`;
  }

  // J’affiche ici les infos du trajet (lieu, date, heure)
  afficherInfosTrajet() {
    const { depart, arrivee, date, heure, places, prix, eco } = this.trajet;

    const trajetEl = document.getElementById("chauffeurTrajet");
    const dateHeureEl = document.getElementById("chauffeurDateHeure");
    const placesEl = document.getElementById("chauffeurPlaces");
    const prixEl = document.getElementById("chauffeurPrix");
    const ecoEl = document.getElementById("chauffeurEco");

    if (trajetEl) trajetEl.textContent = `${depart} → ${arrivee}`;
    if (dateHeureEl) dateHeureEl.textContent = `${date || ""} ${heure || ""}`;
    if (placesEl) placesEl.textContent = places;
    if (prixEl) prixEl.textContent = prix;
    if (ecoEl) ecoEl.textContent = eco ? "Oui" : "Non";
  }

  // J’affiche ici les infos sur le véhicule du chauffeur
  afficherVoiture() {
    const v = this.trajet.voiture || {};
    const champs = {
      carMarque: v.marque,
      carModele: v.modele,
      carCouleur: v.couleur || "—",
      carEnergie: v.energie,
    };

    // J’affiche un résumé du véhicule
    const vehicleInfo = document.getElementById("vehicleInfo");
    if (vehicleInfo)
      vehicleInfo.textContent = [v.marque, v.modele, v.energie]
        .filter(Boolean)
        .join(" • ");

    // J’affiche chaque champ individuellement
    for (const [id, value] of Object.entries(champs)) {
      const el = document.getElementById(id);
      if (el) el.textContent = value || "";
    }
  }

  // J’affiche ici les préférences du chauffeur
  afficherPreferences() {
    const prefs = document.getElementById("driverPrefs");
    if (!prefs) return;

    const liste = this.trajet.preferences || [];
    prefs.innerHTML = liste.length
      ? liste.map((p) => `<li>${p}</li>`).join("")
      : "<li>Aucune préférence précisée.</li>";
  }

  // J’affiche ici les avis laissés sur le conducteur
  afficherAvis() {
    const avisContainer = document.getElementById("driverReviews");
    if (!avisContainer) return;

    const avisList = this.trajet.avis || [];
    avisContainer.innerHTML = avisList.length
      ? avisList
          .map(
            (a) =>
              `<li><strong>${a.auteur}</strong> (${a.note}/5) : ${a.commentaire}</li>`
          )
          .join("")
      : "<li>Aucun avis pour ce conducteur.</li>";
  }

  // Je prépare ici le bouton pour la participation au trajet
  configurerParticipation() {
    const btnPart = document.getElementById("btnParticiper");
    if (btnPart) btnPart.addEventListener("click", () => this.participer());
  }

  // Je gère ici toute la logique de participation d’un utilisateur
  participer() {
    const session = getCurrentUser();
    if (!session) {
      if (confirm("Vous devez être connecté pour participer. Aller à la page de connexion ?"))
        window.location.href = "./login.php";
      return;
    }

    const user = UserModel.findById(session.id);
    if (!user) {
      alert("Session invalide, reconnectez-vous.");
      return (window.location.href = "./login.php");
    }

    if (this.trajet.places <= 0) return alert("Plus aucune place disponible.");

    // Je demande confirmation avant de valider
    if (!confirm(`Confirmez-vous votre participation pour ${this.trajet.prix} € ?`)) return;

    // J’ajoute l’utilisateur comme participant
    const success = TrajetModel.addParticipant(this.trajet.id, user.id);
    if (!success) return alert("Erreur : participation impossible.");

    // J’enregistre la réservation et la notification
    ReservationModel.add({
      trajetId: this.trajet.id,
      userId: user.id,
      date: new Date().toISOString(),
      prix: this.trajet.prix,
    });

    NotificationModel.add({
      userId: user.id,
      message: `Vous participez désormais au trajet ${this.trajet.depart} → ${this.trajet.arrivee}`,
      type: "success",
    });

    alert("Participation confirmée !");
    window.location.reload();
  }
}
