<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>EcoRide - Contact</title>
    <script type="module" src="../assets/js/main.js"></script>
  </head>

  <body data-page="contact">
    <?php include(__DIR__ . '/../components/header.php'); ?>

    <main>
      <section class="contact_section">
        <h1>Contactez-nous</h1>
        <form id="contactForm">
          <label for="name">Nom :</label>
          <input type="text" id="name" placeholder="Votre nom" required />

          <label for="email">Email :</label>
          <input type="email" id="email" placeholder="Votre email" required />

          <label for="message">Message :</label>
          <textarea id="message" placeholder="Votre message" required></textarea>

          <button type="submit">Envoyer</button>
        </form>
      </section>
    </main>

    <?php include(__DIR__ . '/../components/footer.php'); ?>
  </body>
</html>
