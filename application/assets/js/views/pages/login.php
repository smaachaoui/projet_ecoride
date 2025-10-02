<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>EcoRide - Connexion</title>
    </head>

    <body>
        <?php include '../components/header.php'; ?>

        <main>
            
            <section>
                <!-- Formulaire de connexion -->
                 
                <h1>Vous avez déjà un compte ?<br> Connectez-vous</h1>

                <form id ="loginForm">
                    <label for="email">Email :</label>
                    <input type="email" id="email" name="email" required>

                    <label for="password">Mot de passe :</label>
                    <input type="password" id="password" name="password" required>

                    <button type="submit" id="loginButton">Se connecter</button>
                </form>
                
            </section>

        </main>

        
        <?php include '../components/footer.php'; ?>
        
    </body>
</html>