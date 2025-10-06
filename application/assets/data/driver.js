// Je crée un tableau qui contient les données des conducteurs
export const drivers = [
  {
    id: 1,
    pseudo: "Maelle",
    note: 4.8,
    depart: "Paris",
    arrivee: "Lille",
    date: "2025-10-10",
    heure: "08:00",
    places: 2,
    prix: 15,
    duree: 2.5,
    eco: true,
    photo: "../assets/img/user_picture.png",
    voiture: { marque: "Tesla", modele: "Model 3", energie: "Électrique", couleur: "Noir" },
    preferences: ["Non-fumeur", "Pas d’animaux"],
    avis: [
      { auteur: "Jean", commentaire: "Conductrice au top ! Tesla très propre et silencieuse.", note: 5 },
      { auteur: "Sophie", commentaire: "Super trajet, conduite fluide et ponctuelle.", note: 5 }
    ]
  },

  {
    id: 2,
    pseudo: "Gustave",
    note: 4.2,
    depart: "Lyon",
    arrivee: "Marseille",
    date: "2025-10-11",
    heure: "09:30",
    places: 1,
    prix: 20,
    duree: 3.5,
    eco: false,
    photo: "../assets/img/user_picture.png",
    voiture: { marque: "Peugeot", modele: "308", energie: "Diesel", couleur: "Gris" },
    preferences: ["Fumeur", "Animaux acceptés"],
    avis: [
      { auteur: "Luc", commentaire: "Bonne conduite, mais voiture un peu bruyante.", note: 4 },
      { auteur: "Mila", commentaire: "Trajet agréable, musique sympa à bord.", note: 4 }
    ]
  },

  {
    id: 3,
    pseudo: "Sophie",
    note: 5.0,
    depart: "Paris",
    arrivee: "Bordeaux",
    date: "2025-10-12",
    heure: "07:15",
    places: 3,
    prix: 25,
    duree: 5.0,
    eco: true,
    photo: "../assets/img/user_picture.png",
    voiture: { marque: "Renault", modele: "Clio", energie: "Hybride", couleur: "Bleu" },
    preferences: ["Non-fumeur"],
    avis: [
      { auteur: "Paul", commentaire: "Voiture très propre, très bon confort de route.", note: 5 },
      { auteur: "Clara", commentaire: "Sophie conduit prudemment et sa Clio est impeccable.", note: 5 }
    ]
  },

  {
    id: 4,
    pseudo: "Julien",
    note: 4.6,
    depart: "Toulouse",
    arrivee: "Bordeaux",
    date: "2025-10-15",
    heure: "10:00",
    places: 3,
    prix: 18,
    duree: 2.0,
    eco: true,
    photo: "../assets/img/user_picture.png",
    voiture: { marque: "Kia", modele: "Niro", energie: "Hybride", couleur: "Vert" },
    preferences: ["Non-fumeur"],
    avis: [
      { auteur: "Aline", commentaire: "Très ponctuel et sympa, le Kia Niro est confortable.", note: 5 },
      { auteur: "Lucas", commentaire: "Bonne ambiance à bord, voiture très propre.", note: 4.5 }
    ]
  },

  {
    id: 5,
    pseudo: "Lina",
    note: 4.9,
    depart: "Nantes",
    arrivee: "Paris",
    date: "2025-10-18",
    heure: "06:45",
    places: 2,
    prix: 30,
    duree: 4.0,
    eco: true,
    photo: "../assets/img/user_picture.png",
    voiture: { marque: "Volkswagen", modele: "ID.4", energie: "Électrique", couleur: "Blanc" },
    preferences: ["Pas d’animaux"],
    avis: [
      { auteur: "Paul", commentaire: "Conduite douce, voiture silencieuse et confortable.", note: 4.5 },
      { auteur: "Emma", commentaire: "Très bonne conductrice, ID.4 très propre.", note: 5 }
    ]
  },

  {
    id: 6,
    pseudo: "Yassine",
    note: 4.1,
    depart: "Marseille",
    arrivee: "Nice",
    date: "2025-10-20",
    heure: "13:30",
    places: 4,
    prix: 10,
    duree: 2.0,
    eco: false,
    photo: "../assets/img/user_picture.png",
    voiture: { marque: "Citroën", modele: "C4", energie: "Essence", couleur: "Rouge" },
    preferences: ["Fumeur"],
    avis: [
      { auteur: "Noah", commentaire: "Chauffeur sympa, conduite un peu rapide parfois.", note: 4 },
      { auteur: "Sarah", commentaire: "Citroën bien entretenue, musique agréable.", note: 4.2 }
    ]
  },

  {
    id: 7,
    pseudo: "Emma",
    note: 5.0,
    depart: "Strasbourg",
    arrivee: "Dijon",
    date: "2025-10-22",
    heure: "09:00",
    places: 1,
    prix: 12,
    duree: 2.5,
    eco: true,
    photo: "../assets/img/user_picture.png",
    voiture: { marque: "Hyundai", modele: "Kona", energie: "Électrique", couleur: "Bleu ciel" },
    preferences: ["Non-fumeur", "Animaux acceptés"],
    avis: [
      { auteur: "Louis", commentaire: "Super trajet, voiture très confortable.", note: 5 },
      { auteur: "Anaïs", commentaire: "Emma est très sympathique et ponctuelle.", note: 5 }
    ]
  },

  {
    id: 8,
    pseudo: "Clément",
    note: 4.3,
    depart: "Lille",
    arrivee: "Bruxelles",
    date: "2025-10-25",
    heure: "08:15",
    places: 2,
    prix: 14,
    duree: 1.5,
    eco: true,
    photo: "../assets/img/user_picture.png",
    voiture: { marque: "Fiat", modele: "500e", energie: "Électrique", couleur: "Rouge" },
    preferences: ["Non-fumeur"],
    avis: [
      { auteur: "Manon", commentaire: "Petit trajet très agréable, Fiat silencieuse.", note: 4.5 },
      { auteur: "Eliott", commentaire: "Conduite fluide, conducteur sympa.", note: 4.3 }
    ]
  },

  {
    id: 9,
    pseudo: "Noah",
    note: 4.0,
    depart: "Bordeaux",
    arrivee: "Toulouse",
    date: "2025-10-26",
    heure: "11:30",
    places: 3,
    prix: 16,
    duree: 2.0,
    eco: false,
    photo: "../assets/img/user_picture.png",
    voiture: { marque: "Peugeot", modele: "208", energie: "Essence", couleur: "Jaune" },
    preferences: ["Fumeur", "Pas d’animaux"],
    avis: [
      { auteur: "Camille", commentaire: "Bon conducteur, voiture confortable.", note: 4 },
      { auteur: "Julien", commentaire: "Peugeot bien entretenue, trajet rapide.", note: 4 }
    ]
  },

  {
    id: 10,
    pseudo: "Camille",
    note: 4.7,
    depart: "Grenoble",
    arrivee: "Lyon",
    date: "2025-10-28",
    heure: "07:30",
    places: 2,
    prix: 15,
    duree: 1.5,
    eco: true,
    photo: "../assets/img/user_picture.png",
    voiture: { marque: "Toyota", modele: "Yaris Hybride", energie: "Hybride", couleur: "Gris clair" },
    preferences: ["Non-fumeur"],
    avis: [
      { auteur: "Sarah", commentaire: "Trajet agréable, Yaris silencieuse et propre.", note: 5 },
      { auteur: "Mathis", commentaire: "Camille est ponctuelle et très aimable.", note: 4.8 }
    ]
  }
];
