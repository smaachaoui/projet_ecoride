<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>EcoRide - Inscription</title>
    </head>

    <body>
        <?php include '../components/header.php'; ?>

        <main>
            
            <section>
                <!-- Formulaire d'inscription -->

                <h1>Vous êtes nouveau ici ?<br> Inscrivez-vous</h1>

                <form id ="registerForm">
                    <label for="pseudo">Pseudo :</label>
                    <input type="text" id="pseudo" name="pseudo" required>

                    <label for="email">Email :</label>
                    <input type="email" id="email" name="email" required>

                    <label for="password">Mot de passe :</label>
                    <input type="password" id="password" name="password" required>

                    <label for="confirmPassword">Confirmer le mot de passe :</label>
                    <input type="password" id="confirmPassword" name="confirmPassword" required>

                    <button type="submit" id="registerButton">S'inscrire</button>
                </form>
                
                
            </section>

        </main>

        
        <?php include '../components/footer.php'; ?>
        
    </body>
</html>