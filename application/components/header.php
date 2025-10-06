<?php
  // Je vérifie si la page actuelle se trouve dans le dossier /pages/
  // (__DIR__ correspond au dossier actuel : /components)
  $isPage = isset($_SERVER['SCRIPT_NAME']) && strpos($_SERVER['SCRIPT_NAME'], '/pages/') !== false;

  // Je définis les chemins relatifs selon l’emplacement de la page
  $ASSET_PREFIX = $isPage ? '../' : './';   // Pour accéder aux fichiers CSS / JS / images
  $PAGE_PREFIX  = $isPage ? './'  : './pages/'; // Pour les liens de navigation internes
  $ROOT_PREFIX  = $isPage ? '../' : './';   // Pour revenir à la racine du site
?>

<!-- Je charge la feuille de style principale -->
<link rel="stylesheet" href="<?= $ASSET_PREFIX ?>assets/css/style.css">

<!-- Je définis l’en-tête principal du site avec le logo et le menu -->
<header>
  <div class="logo">
    <!-- Je charge le logo EcoRide -->
    <img class="logo_picture" src="<?= $ASSET_PREFIX ?>assets/img/logo.png" alt="Logo EcoRide" />
  </div>

  <!-- Je crée le menu burger pour les écrans mobiles -->
  <button class="burger" id="burgerMenu" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>

  <!-- Je définis la navigation principale du site -->
  <nav id="navMenu">
    <a href="<?= $ROOT_PREFIX ?>index.php" id="navHome">Accueil</a>
    <a href="<?= $PAGE_PREFIX ?>covoiturages.php" id="navCovoits">Covoiturages</a>
    <a href="<?= $PAGE_PREFIX ?>contact.php" id="navContact">Contact</a>

    <!-- Je gère l’affichage dynamique des liens selon le rôle utilisateur -->
    <a href="<?= $PAGE_PREFIX ?>user_profile.php" id="navProfile" style="display:none">Mon profil</a>
    <a href="<?= $PAGE_PREFIX ?>employe_profile.php" id="navEmploye" style="display:none">Espace employé</a>
    <a href="<?= $PAGE_PREFIX ?>admin_profile.php" id="navAdmin" style="display:none">Espace admin</a>

    <!-- Je définis les liens de connexion et d’inscription -->
    <a href="<?= $PAGE_PREFIX ?>login.php" id="navLogin">Connexion</a>
    <a href="<?= $PAGE_PREFIX ?>register.php" id="navRegister">Inscription</a>

    <!-- Je prévois un bouton de déconnexion masqué par défaut -->
    <a href="#" id="navLogout" style="display:none">Déconnexion</a>
  </nav>
</header>
