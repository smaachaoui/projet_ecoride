<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>EcoRide - Inscription</title>
    <script type="module" src="../assets/js/main.js"></script>
  </head>
  <body data-page="register">
    <?php include(__DIR__ . '/../components/header.php'); ?>
    <main>
      <section class="register_section">
        <h1>Inscription</h1>
        <form id="registerForm">
          <div id="registerAlert" class="alert"></div>
          <label for="pseudo">Pseudo</label>
          <input type="text" id="pseudo" name="pseudo" placeholder="Votre pseudo" required />
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Votre email" required autocomplete="email" />
          <label for="password">Mot de passe</label>
          <input type="password" id="password" name="password" placeholder="Mot de passe" required autocomplete="new-password" />
          <label for="confirmPassword">Confirmez le mot de passe</label>
          <input type="password" id="confirmPassword" name="passwordConfirm" placeholder="Confirmez votre mot de passe" required autocomplete="new-password" />
          <div style="margin:.5rem 0;">
            <small id="passwordHint">Renforcez votre mot de passe</small><br />
            <progress id="pwdMeter" max="5" value="0" style="width:100%;"></progress>
          </div>
          <button type="submit">S’inscrire</button>
        </form>
          <p class="auth-cta">
            <span>Déjà un compte ?</span> <a href="./login.php">Connectez-vous</a>
          </p>
    
      </section>
    </main>
    <?php include(__DIR__ . '/../components/footer.php'); ?>
  </body>
</html>
