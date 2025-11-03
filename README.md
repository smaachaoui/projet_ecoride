EcoRide – Partie front (Activité type 1)

Objectif : 

Je développe la partie front-end d’EcoRide (plateforme de covoiturage éco-responsable) en suivant une architecture MVC.

Comment ça fonctionne ?

- Je considère les pages php comme des vues HTML : elles exposent des éléments identifiés (id/classes) que je remplis en JS.

- J’écris des contrôleurs JavaScript qui gèrent la logique de chaque page (recherche, filtres, participation, profil, etc.).

- Je stocke les données côté navigateur via le localStorage avec des modèles JS (pas de base réelle ici).

- Dans main.js, je détecte la page courante grâce à `body[data-page]` et j’initialise le bon contrôleur.

En pratique, quand j’arrive sur une page :
1. `main.js` reconnaît la page (ex. `data-page="detail"`).
2. J’instancie le contrôleur associé (ex. `DetailController`).
3. Le contrôleur lit/écrit les données via les modèles (ex. `TrajetModel`, `ReservationModel`).
4. La vue est mise à jour dynamiquement (texte, listes, boutons).

US et fichiers liés (activité type 1)
| US | Vue (PHP) | Contrôleur | Modèle(s) | Rôle principal |

| US1 | index.php | main.js | — | Je présente l’accueil et la recherche. |

| US2 | header.php / main.js | main.js | — | Je gère le menu selon la session et le rôle. |

| US3–4 | covoiturages.php | covoiturageController.js | trajetModel.js | Je liste et je filtre les covoiturages. |

| US5 | detail.php | detailController.js | trajetModel.js | J’affiche le détail d’un trajet. |

| US6 | detail.php / user_profile.php | detailController.js / userController.js | reservationModel.js, notificationModel.js | Je participe et j’annule une réservation. |

| US7 | register.php | authController.js | userModel.js | Je crée un compte avec contrôle basique. |

| US11 | detail.php | detailController.js | trajetModel.js | Je démarre/termine un covoiturage (chauffeur). |

| US12 | employe_profile.php | employeController.js | userModel.js, trajetModel.js | Je valide des avis / consulte incidents. |

| US13 | admin_profile.php | adminController.js | userModel.js, trajetModel.js | Je gère les comptes et les statistiques. |

Utilisation rapide
1. J’ouvre `application/pages/index.php` dans un navigateur.
2. Je recherche un covoiturage (ville + date) et j’affiche les résultats.
Quelques exemples : 
- Paris -> Lille -> 10/10/2025
- Lyon -> Marseille -> 11/10/2025
- Paris -> Bordeaux -> 12/10/2025
3. Je consulte un détail, je participe (si connecté), puis je vois/annule la réservation dans mon profil.
4. Les espaces Employé/Admin sont accessibles selon le rôle connecté.

5. Je fournis plusieurs jeux d’identifiants pour tester les différents rôles disponibles.

Administrateur :
Email : admin@ecoride.fr / Mot de passe : Adminécolo10*

Utilisateur :
Email : hugo@ecoride.fr / Mot de passe : hugo123
Email : test@ecoride.fr / Mot de passe : Formationstudi123*
Email : alice@ecoride.fr / Mot de passe : alice123

Employé :
Email : sarah@ecoride.fr / Mot de passe : sarah123
Email : nina@ecoride.fr / Mot de passe : nina123

Remarque
Il s'agit uniquement de la partie front de l'application : je simule la persistance via le localStorage pour démontrer le fonctionnement complet dans le navigateur.
