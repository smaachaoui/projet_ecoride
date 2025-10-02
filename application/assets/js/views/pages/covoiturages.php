<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>EcoRide - Covoiturages</title>
    </head>

    <body>
        <?php include '../components/header.php'; ?>

        <main>
            
            <section>

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
                <div id="results">
                    <!-- Les résultats de la recherche seront affichés ici -->
                </div>
            </section>
        </main>

        
        <?php include '../components/footer.php'; ?>
        
    </body>
</html>