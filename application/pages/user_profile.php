<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EcoRide - Mon Profil</title>
    <script type="module" src="../assets/js/main.js"></script>
  </head>

  <body data-page="user_profile">
    <?php include(__DIR__ . '/../components/header.php'); ?>

    <main>

      <!-- Je gère les informations principales du profil -->
      <section class="profile_section">
        <div class="profile_container">
          <h1>Mon profil</h1>

          <p><b>Pseudo :</b> <span id="profileName"></span></p>
          <p><b>Email :</b> <span id="profileEmail"></span></p>
          <p><b>Rôle :</b> <span id="profileRole"></span></p>
          <p><b>Crédits :</b> <span id="profileCredits"></span></p>

          <!-- Je gère le choix du rôle -->
          <div id="roleChooser" class="container_card">
            <h2>Choisissez votre rôle</h2>
            <form id="roleForm">
              <label><input type="radio" name="roleCovoit" value="passager"> Passager</label>
              <label><input type="radio" name="roleCovoit" value="chauffeur"> Chauffeur</label>
              <label><input type="radio" name="roleCovoit" value="passager-chauffeur"> Passager chauffeur</label>
              <button type="submit" class="btn">Valider</button>
            </form>
          </div>

          <button id="addCreditsBtn" class="btn">Ajouter des crédits</button>
          <button id="logoutBtn" class="btn btn-secondary">Se déconnecter</button>
        </div>
      </section>

      <!-- J’affiche la liste des réservations de l’utilisateur -->
      <section id="userReservations" class="section">
        <h3>Mes réservations</h3>
        <ul id="reservationsList"></ul>
        <p id="noReservations" style="display:none;">Aucune réservation pour le moment.</p>
      </section>

      <!-- J’affiche le formulaire du véhicule (uniquement si chauffeur) -->
      <section id="vehiculeSection" class="container_card" style="display:none;">
        <h2>Mes véhicules</h2>
        <form id="vehiculeForm">
          <input type="text" id="vehMarque" placeholder="Marque" required />
          <input type="text" id="vehModele" placeholder="Modèle" required />
          <input type="text" id="vehCouleur" placeholder="Couleur" />
          <input type="text" id="vehPlaque" placeholder="Plaque d'immatriculation" required />
          <input type="date" id="vehDateImmat" placeholder="Date de première immatriculation" />
          <input type="text" id="vehEnergie" placeholder="Énergie (élec/thermique)" />
          <input type="number" id="vehPlaces" placeholder="Places disponibles" required />
          <button type="submit" class="btn">Enregistrer le véhicule</button>
        </form>

        <!-- Liste des véhicules enregistrés -->
        <ul id="vehiculeList"></ul>
      </section>

    </main>

    <?php include(__DIR__ . '/../components/footer.php'); ?>
  </body>
</html>
