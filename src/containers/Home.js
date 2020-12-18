import { useState, useEffect } from "react";
import styled from "styled-components";
import CardRicette from "../components/CardRicette";

const Home = () => {
  return (
    <Contenitore>
        <CardRicette />
    </Contenitore>
  );
};

const Contenitore = styled.div`
.card{
    max-width: 345px;
    
}
.card-media {
    height: 0;
    padding-top: 56.25%;
  }
`;
export default Home;
