<!DOCTYPE html>
<html lang="fr">
  <head>
    <!-- Je définis l’encodage et les métadonnées principales -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Je définis le titre de la page -->
    <title>EcoRide - Accueil</title>

    <!-- Je charge le script principal en module -->
    <script type="module" src="./assets/js/main.js"></script>
  </head>

  <body data-page="home">

    <!-- J’inclus le composant d’en-tête (menu et logo) -->
    <?php include(__DIR__ . '/components/header.php'); ?>

    <main>
      <!-- Je présente brièvement l’application -->
      <section class="first_section">
        <h1>Bienvenue sur EcoRide</h1>
        <p>Une conduite écologique et économique.</p>
      </section>

      <!-- Je décris le concept de la plateforme EcoRide -->
      <section class="second_section">
        <h2>C'est quoi EcoRide ?</h2>
        <p>
          EcoRide est une plateforme de covoiturage qui met en relation des conducteurs et des passagers pour partager des trajets.<br>
          Notre mission est de promouvoir une mobilité plus durable en facilitant le partage de véhicules.
        </p>
      </section>

      <!-- Je crée la section de recherche de covoiturages -->
      <section class="search_section">
        <h2>Recherchez un covoiturage</h2>

        <!-- Je crée le formulaire permettant de rechercher un trajet -->
        <form id="searchForm" action="./pages/covoiturages.php">
          <div>
            <label for="homeDeparture">Ville de départ</label>
            <input type="text" id="homeDeparture" name="departure" placeholder="Paris" required/>
          </div>

          <div>
            <label for="homeDestination">Ville d'arrivée</label>
            <input type="text" id="homeDestination" name="destination" placeholder="Lyon" required/>
          </div>

          <div>
            <label for="homeDate">Date</label>
            <input type="date" id="homeDate" name="date" required/>
          </div>

          <div>
            <button type="submit" class="btn">Rechercher</button>
          </div>
          
        </form>
      </section>

      <!-- Je présente les avantages de la plateforme -->
      <section class="third_section">
        <h3>Pourquoi choisir EcoRide ?</h3>

        <div>
          <h4>Écologique</h4>
          <p>Je réduis l’empreinte carbone grâce au partage de trajets en covoiturage.</p>
        </div>

        <div>
          <h4>Économique</h4>
          <p>Je propose des tarifs abordables pour rendre le transport plus accessible.</p>
        </div>

        <div>
          <h4>Convivial</h4>
          <p>Je favorise les échanges et la bonne ambiance entre passagers.</p>
        </div>
      </section>
    </main>

    <!-- J’inclus le composant de pied de page -->
    <?php include(__DIR__ . '/components/footer.php'); ?>

  </body>
</html>
