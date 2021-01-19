import { useState, useEffect, useContext} from "react";
import styled from "styled-components";

import MiniaturaRicetta from '../components/MiniaturaRicetta'
import { RicetteContext, UtenteContext } from './App';

const Preferiti = () => {
const ricetteContesto = useContext(RicetteContext);
const utenteContesto = useContext(UtenteContext);

const ricettePreferite = ricetteContesto?.chiaviRicette.filter((chiave) => { // in questo modo mi ciclo tutte le ricette e vado a verificare se ci sono dei preferiti
    return utenteContesto.isPreferito(chiave); // tramite il metodo isPreferito, verifico se le ricette ciclate, sono tra nel nodo preferiti dell'utente, e se ci sono le assegno alla costante ricettePreferite
})
//console.log(ricettePreferite);
  return (
    <Contenitore>
      { ricettePreferite && ricettePreferite.map((chiave) =>(
        <MiniaturaRicetta
        //passiamo le props al componente MiniaturaRicetta
            chiave={chiave}
            key={chiave}
            titolo={ricetteContesto.oggettoRicette[chiave].name}
            url={ricetteContesto.oggettoRicette[chiave].image.url}
            descrizione={ricetteContesto.oggettoRicette[chiave].description}
            categoria={ricetteContesto.oggettoRicette[chiave].recipeCategory}
        />
      ))}
    </Contenitore>
  );
};

const Contenitore = styled.div`
display: flex;
    flex-wrap: wrap;
    padding: 50px;
    justify-content: center;
`;
export default Preferiti;
