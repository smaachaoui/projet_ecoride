<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EcoRide - Connexion</title>
    <script type="module" src="../assets/js/main.js"></script>
  </head>

  <body data-page="login">
    <?php include(__DIR__ . '/../components/header.php'); ?>

    <main>
      <section class="login_section">
        <div id="loginAlert" class="alert" style="display:block"></div>
           <h1>Connexion</h1>
        <form id="loginForm">

          <label for="email">Email :</label>
          <input type="email" id="email" name="email" required>

          <label for="password">Mot de passe :</label>
          <input type="password" id="password" name="password" required>

          <button type="submit" id="loginButton">Se connecter</button>
        </form>

        <p class="auth-cta" style="margin-top:.75rem;">
          <a href="./forgot_password.php">Mot de passe oublié ?</a>
        </p>
        <p class="auth-cta">
          <span>Vous n'avez pas de compte ?</span><a href="./register.php">Inscrivez-vous en cliquant ici</a>
        </p>
      </section>
    </main>

    <?php include(__DIR__ . '/../components/footer.php'); ?>
  </body>
</html>
