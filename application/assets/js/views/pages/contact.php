<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>EcoRide - Contact</title>
    </head>

    <body>
        <?php include '../components/header.php'; ?>

        <main>
            
            <section>

                <h1>Une question ou des suggestions ?<br>Contactez-nous</h1>
                <form id = "contactForm">
                    <label for="name">Nom:</label>
                    <input type="text" id="name" name="name" required>

                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" required>

                    <label for="message">Message:</label>
                    <textarea id="message" name="message" required></textarea>

                    <button type="submit" id="sendButton">Envoyer</button>
                </form>
            </section>
               
        </main>

        
        <?php include '../components/footer.php'; ?>
        
    </body>
</html>