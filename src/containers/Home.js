import { useState, useEffect, useContext} from "react";
import styled from "styled-components";
import MiniaturaRicetta from '../components/MiniaturaRicetta'
import { RicetteContext } from './App';

const Home = () => {
const ricetteContesto = useContext(RicetteContext);
//console.log(ricetteContesto);
  return (
    <Contenitore>
      { ricetteContesto.chiaviRicette && ricetteContesto.chiaviRicette.map((chiave) =>(
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
export default Home;
