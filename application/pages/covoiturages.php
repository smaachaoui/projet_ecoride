<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script type="module" src="../assets/js/main.js"></script>
    <title>EcoRide - Covoiturages</title>

    <!-- Script principal (chemin relatif) -->
  </head>

  <body data-page="covoiturages">
    <!-- HEADER -->

    <?php include(__DIR__ . '/../components/header.php'); ?>

    <main class="results_section">
      <h1>Rechercher un trajet</h1>

      <form id="searchForm">
        <label for="departure">Lieu de départ</label>
        <input type="text" id="departure" name="departure" placeholder="Paris" required>

        <label for="destination">Lieu d'arrivée</label>
        <input type="text" id="destination" name="destination" placeholder="Lyon" required>

        <label for="date">Date</label>
        <input type="date" id="date" name="date" required>

        <button type="submit" id="searchButton">Rechercher</button>
      </form>

      <aside class="filter_bar">
        <div>
          <label for="filterEco">Écologique (électrique)</label>
            <input type="checkbox" id="filterEco">
        </div>
        <div>
          <label for="filterPrice">Prix max (€)</label>
          <input type="number" id="filterPrice" min="0" step="1" />
        </div>
        <div>
          <label for="filterDuration">Durée max (min)</label>
          <input type="number" id="filterDuration" min="0" step="10" />
        </div>
        <div>
          <label for="filterNote">Note minimale</label>
          <input type="number" id="filterNote" min="0" max="5" step="0.5" />
        </div>
        <button type="button" id="applyFilters">Appliquer les filtres</button>
      </aside>

      <section id="results" class="results_container"></section>
    </main>

    <?php include(__DIR__ . '/../components/footer.php'); ?>

  </body>

</html>
