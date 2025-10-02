// Je créer une classe pour gérer la recherche de covoiturages
export default class CovoiturageController {
    constructor(departure, destination, date) {

        // Je cible les champs du formulaire de recherche de covoiturages
        this.departure = document.getElementById('departure');
        this.destination = document.getElementById('destination');
        this.date = document.getElementById('date');
      

        console.log(this.departure);
        console.log(this.destination);
        console.log(this.date);

        this.init();
    }

     // Je mets en place les écouteurs d'événements lors de la saisie dans les champs du formulaire
    init() {
        this.departure.addEventListener('keyup', () => this.handleInputChange());
        this.destination.addEventListener('keyup', () => this.handleInputChange());
        this.date.addEventListener('keyup', () => this.handleInputChange());
    }

    // Je gère les changements dans les champs du formulaire
    handleInputChange() {
        const departureValue = this.departure.value;
        const destinationValue = this.destination.value;
        const dateValue = this.date.value;

        console.log(`Départ: ${departureValue}, Destination: ${destinationValue}, Date: ${dateValue}`);
       
    }

    // Je créer une fonction pour rechercher les covoiturages en fonction des critères saisis
    searchCovoiturages(departure, destination, date) {
        
    }

  
}