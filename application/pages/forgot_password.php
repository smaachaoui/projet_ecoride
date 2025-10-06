<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EcoRide - Mot de passe oublié</title>
    <script type="module" src="../assets/js/main.js"></script>
  </head>
  <body data-page="forgot">
    <?php include(__DIR__ . '/../components/header.php'); ?>
    <main>
      <section class="auth_section">
        <h1>Mot de passe oublié</h1>
        <form id="forgotForm">
          <div id="forgotAlert" class="alert"></div>
          <label for="forgotEmail">Votre email</label>
          <input type="email" id="forgotEmail" name="email" required autocomplete="email" />
          <button type="submit">Envoyer le lien de réinitialisation</button>
        </form>
        <p class="auth-cta"><a href="./login.php">Retour à la connexion</a></p>
      </section>
    </main>
    <?php include(__DIR__ . '/../components/footer.php'); ?>
  </body>
</html>
