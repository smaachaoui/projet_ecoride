<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EcoRide - Détail du covoiturage</title>
    <script type="module" src="../assets/js/main.js"></script>
  </head>

  <body data-page="detail">
    <?php include(__DIR__ . '/../components/header.php'); ?>

    <main class="detail-container">
      <section id="detail-header">
        <h1>Détail du covoiturage</h1>
        <div class="profile_picture">
          <img id="chauffeurPhoto" src="../assets/img/user_picture.png" alt="Photo du chauffeur">
        </div>
        <h2 id="chauffeurPseudo">Pseudo</h2>
        <p id="chauffeurNote">Note :</p>
      </section>

      <section id="travel-info" class="section">
        <h3>Voyage</h3>
        <ul>
          <li>Trajet : <span id="chauffeurTrajet"></span></li>
          <li>Date et heure : <span id="chauffeurDateHeure"></span></li>
          <li>Places restantes : <span id="chauffeurPlaces"></span></li>
          <li>Prix : <span id="chauffeurPrix"></span> €</li>
          <li>Écologique : <span id="chauffeurEco"></span></li>
        </ul>
      </section>

      <section id="vehicle-section" class="section">
        <h3>Véhicule</h3>
        <p id="vehicleInfo"></p>
        <ul>
          <li>Marque : <span id="carMarque"></span></li>
          <li>Modèle : <span id="carModele"></span></li>
          <li>Couleur : <span id="carCouleur"></span></li>
          <li>Énergie : <span id="carEnergie"></span></li>
        </ul>
      </section>

      <section id="driverPrefsSection" class="section">
        <h3>Préférences du conducteur</h3>
        <ul id="driverPrefs"></ul>
      </section>

      <div style="margin:1rem 0;">
        <button id="btnParticiper" class="btn">Participer</button>
      </div>

      <section id="driverReviewsSection" class="section">
        <h3>Avis du conducteur</h3>
        <ul id="driverReviews"></ul>
      </section>

    </main>

    <?php include(__DIR__ . '/../components/footer.php'); ?>
  </body>
</html>
