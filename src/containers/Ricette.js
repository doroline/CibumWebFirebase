import { useState, useEffect } from "react";
import styled from "styled-components";
import MiniaturaRicetta from '../components/MiniaturaRicetta'

const Ricette = () => {
  return (
    <Contenitore>
     Pagina delle ricette
    </Contenitore>
  );
};

const Contenitore = styled.div`
display: flex;
    flex-wrap: wrap;
    padding: 50px;
    justify-content: center;
`;
export default Ricette;
