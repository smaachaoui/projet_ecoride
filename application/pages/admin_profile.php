
<script type="module" src="../assets/js/main.js"></script>


<body data-page="admin_profile">

    <?php include(__DIR__ . '/../components/header.php'); ?>

  <main class="profile_main">
    <section class="admin_dashboard">
      <h1>Tableau de bord Administrateur</h1>
      <p>Bienvenue dans votre espace admin.</p>

        <div class="admin_stats">
            <div class="stat_card">
              <h2>Covoiturages du jour</h2>
              <p id="trajetsCount" class="stat_value">0</p>
            </div>

            <div class="stat_card">
              <h2>Crédits gagnés aujourd’hui</h2>
              <p id="creditsCount" class="stat_value">0</p>
            </div>
          </div>

          <div id="createEmployeeContainer" style="margin-top:2em;">
            <h2>Créer un employé</h2>
            <form id="createEmployeeForm">
              <input type="text" id="empPseudo" placeholder="Pseudo" required />
              <input type="email" id="empEmail" placeholder="Email" required />
              <input type="password" id="empPwd" placeholder="Mot de passe" required />
              <button type="submit" class="btn">Créer</button>
            </form>
            <p id="createEmpAlert" class="alert" style="display:none;"></p>
          </div>

          <table id="adminUsers" class="admin_table" style="margin-top:2em;">
            <thead>
              <tr>
                <th>Pseudo</th>
                <th>Email</th>
                <th>Rôle</th>
                <th>Changer rôle</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>

          <div style="margin-top:2em;">
            <button id="logoutBtn" class="btn">Se déconnecter</button>
         </div>
    </section>
  </main>

  <?php include(__DIR__ . '/../components/footer.php'); ?>

</body>
