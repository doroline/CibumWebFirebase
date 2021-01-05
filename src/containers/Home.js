import { useState, useEffect, useContext} from "react";
import styled from "styled-components";
import MiniaturaRicetta from '../components/MiniaturaRicetta'
import { RicetteContext } from './App';

const Home = () => {
const ricette = useContext(RicetteContext);

  return (
    <Contenitore>
    {ricette}
        <MiniaturaRicetta />
        <MiniaturaRicetta />
        <MiniaturaRicetta />
        <MiniaturaRicetta />
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
