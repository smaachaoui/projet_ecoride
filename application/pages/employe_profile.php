<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EcoRide - Espace Employé</title>
    <script type="module" src="../assets/js/main.js"></script>
  </head>
  <body data-page="employe">
    <?php include(__DIR__ . '/../components/header.php'); ?>

    <main class="results_section">
      <h2>Espace Employé</h2>

      <section id="employeData" class="container_card" style="width:auto;max-width:100%"></section>

      <section class="container_card" style="width:auto;max-width:100%">
        <h3>Modération des avis</h3>
        <table id="empReviews" border="1" style="width:100%;background:#cef4d8;">
          <thead><tr><th>Trajet</th><th>Passager</th><th>Commentaire</th><th>Actions</th></tr></thead>
          <tbody></tbody>
        </table>
      </section>

      <section class="container_card" style="width:auto;max-width:100%">
        <h3>Trajets signalés</h3>
        <table id="empBadTrips" border="1" style="width:100%;background:#cef4d8;">
          <thead><tr><th>Trajet</th><th>Raison</th></tr></thead>
          <tbody></tbody>
        </table>
      </section>
    </main>

    <?php include(__DIR__ . '/../components/footer.php'); ?>
  </body>
</html>
