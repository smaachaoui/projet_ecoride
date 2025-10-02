<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="./css/style.css">
        <script type="module" src="./js/main.js"></script>
        <title>EcoRide - Accueil</title>
    </head>
    
    <body>
        
        <?php include '../components/header.php'; ?>

        <main>
            <section>
        
                <h1>Bienvenue sur EcoRide</h1>
                <p>Une conduite écologique et économique</p>
                
            </section>

            <section>
                <h2> Tu cherches un chauffeur ?</h2>
                    <form id ="searchForm">
                        <label for="departure">Lieu de départ:</label>
                        <input type="text" id="departure" name="departure" required>

                        <label for="destination">Lieu d'arrivée:</label>
                        <input type="text" id="destination" name="destination" required>

                        <label for="date">Date:</label>
                        <input type="date" id="date" name="date" required>

                        <button type="submit" id="searchButton">Rechercher</button>
                    </form>
            </section>

            <section>
                <h3>Pourquoi choisir EcoRide ?</h3>

                <div>
                    <h4>Écologique</h4>
                    <p>Nous privilégions les trajets en covoiturage pour réduire notre empreinte carbone.</p>
                </div>

                <div>
                    <h4>Économique</h4>
                    <p>Des tarifs compétitifs pour un service de qualité.</p>
                </div>

                <div>
                    <h4>Conviviale</h4>
                    <p>Nous favorisons les échanges entre passagers pour rendre le voyage plus agréable.</p>
                </div>

                </div>
            </section>

        </main>

        <?php include '../components/footer.php'; ?>
    
    </body>
</html>