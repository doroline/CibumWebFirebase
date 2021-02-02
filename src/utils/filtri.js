import moment from 'moment';
import { FILTRI } from '../costanti';

export const normalizzaRicette = (ricetteObj) => {

    const arrayNormalizzato = Object.keys(ricetteObj).map((ricettaChiave) => (
        { // queste sono le parentesi graffe dell'oggetto
            name: ricetteObj[ricettaChiave].name,
            description: ricetteObj[ricettaChiave].description,
            recipeCategory: ricetteObj[ricettaChiave].recipeCategory.toLowerCase(), // cosi facendo porto il risultato tutto al minuscolo
            totalTime: moment.duration(ricetteObj[ricettaChiave].totalTime).asMinutes(),
            cost: ricetteObj[ricettaChiave].estimatedCost?.value, 
            id: ricettaChiave
        }
    ));

    return arrayNormalizzato;
};

export const isFiltriObjSelected = (filtriObj) => {
    if (!filtriObj) {
      return false;
    }
    const result = Object.keys(filtriObj).find(val => filtriObj[val] !== null);
    if (result) {
      return true;
    }
    return false;
  };

export const filtra = (stringaDaCercare, arrayRicette, filtriObj) => {
    let stringaDaCercareArray = null;
    if (typeof stringaDaCercare === 'string' && stringaDaCercare.length > 0) { // il typeof è un controllo di javascript che va a verificare che il contenuto di stringaDaCercare sia di tipo stringa
            stringaDaCercareArray = stringaDaCercare.toLowerCase().split(" "); // porto il contenuto che riceverà dentro a stringaDaCercare, quello che scriverà l'utente nel campo di ricerca, a minuscolo e poi gli dico di dividerlo con split, in tanti elementi in base alle parole scritte, ogni volte che trova uno spazio   
    }

    let arrayRicetteFiltrate = arrayRicette;

    // filtriamo per gruppi d filtri radio button
    if (isFiltriObjSelected(filtriObj)) {
        arrayRicetteFiltrate = arrayRicette.filter((ricetta) => {
          let ricettaDaIncludere = true;
          if (filtriObj.CATEGORIA && ricettaDaIncludere) {
            if (ricetta.recipeCategory.toLowerCase().includes(filtriObj.CATEGORIA)) {
              ricettaDaIncludere = true;
            } else {
              ricettaDaIncludere = false;
            }
          }
    
          // ci troviamo l'oggetto nell'array FILTRI.COSTO cosrrispondente al valore che ha inserito l'utente
          const valoreCostoObj = FILTRI.COSTO.find((valore) => valore.value === filtriObj.COSTO);
    
          if (valoreCostoObj && ricettaDaIncludere) {
            if (valoreCostoObj.valueInterval[0] <= ricetta.cost && valoreCostoObj.valueInterval[1] > ricetta.cost) {
              ricettaDaIncludere = true;
            } else {
              ricettaDaIncludere = false;
            }
          }
    
          const valoreDurataObj = FILTRI.DURATA.find((valore) => valore.value === filtriObj.DURATA);
    
          if (valoreDurataObj && ricettaDaIncludere) {
            if (valoreDurataObj.valueInterval[0] <= ricetta.totalTime && valoreDurataObj.valueInterval[1] > ricetta.totalTime) {
              ricettaDaIncludere = true;
            } else {
              ricettaDaIncludere = false;
            }
          }
    
          return ricettaDaIncludere;
    
        })
      }
      



    // qui opero il filtro per la barra di ricerca
    if (stringaDaCercareArray){
        //attraverso il filter mi vado a filtrare le ricette che hanno nel NAME una stringa uguale alla parola cercata
        arrayRicetteFiltrate = arrayRicetteFiltrate.filter((ricetta)=>{
            let ricettaDaIncludere = false;

            /* col forEach scorro tutta l'array con i prodotti, esempio sto cercando "Cannelloni romana", questa ricerca verrà
            assegnata alla proprietà 'elemento' del forEach, poi gli diremo che SE trova quell'elemento nel nome della ricetta
            scorrendola, allora dovrà far diventare True la variabile ricettaDaIncludere, bloccarsi e fare il return di ricettaDaIncludere. Gli diremo anche di trasformare tutto in minuscolo per far meglio la comparazione
            */
            stringaDaCercareArray.forEach((elemento) => {
                // questo è il codice da copiare per fare altri filtraggi
                if(ricetta.name.toLowerCase().includes(elemento)){
                    ricettaDaIncludere = true;
                }
                if(ricetta.description.toLowerCase().includes(elemento)){
                    ricettaDaIncludere = true;
                }
                return ricettaDaIncludere;
            })
            return ricettaDaIncludere;
        }) 
    }
    return arrayRicetteFiltrate;
};