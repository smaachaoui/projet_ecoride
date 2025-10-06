<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EcoRide - Réinitialiser le mot de passe</title>
    <script type="module" src="../assets/js/main.js"></script>
  </head>
  <body data-page="reset">
    <?php include(__DIR__ . '/../components/header.php'); ?>
    <main>
      <section class="auth_section">
        <h1>Réinitialiser le mot de passe</h1>
        <form id="resetForm">
          <div id="resetAlert" class="alert"></div>
          <label for="newPassword">Nouveau mot de passe</label>
          <input type="password" id="newPassword" name="newPassword" required autocomplete="new-password" />
          <label for="newPassword2">Confirmez le mot de passe</label>
          <input type="password" id="newPassword2" name="newPassword2" required autocomplete="new-password" />
          <div class="pwd-meter"><small id="passwordHint">Renforcez votre mot de passe</small><br><progress id="pwdMeter" max="5" value="0"></progress></div>
          <button type="submit">Mettre à jour</button>
        </form>
        <p class="auth-cta"><a href="./login.php">Retour à la connexion</a></p>
      </section>
    </main>
    <?php include(__DIR__ . '/../components/footer.php'); ?>
  </body>
</html>
