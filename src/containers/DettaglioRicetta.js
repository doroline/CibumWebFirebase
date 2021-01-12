import { useState, useEffect, useContext} from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import { RicetteContext } from "./App";
import {colors, breakpoints} from '../global-styles';

import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';

export default function DettaglioRicetta(props) {
  const contestoRicette = useContext(RicetteContext);
  const { chiave } = useParams();
  const ricetta = contestoRicette.oggettoRicette[chiave];

  const history = useHistory();

  const listaRottePrecedenti = useHistory();

  const cambiaRotta = (nuovaRotta) => {
    listaRottePrecedenti.push(nuovaRotta);
  };

  return (
    <Contenitore imgUrl={ricetta?.image?.url}>
      <div className="header-container">
        <div className="header-wrapper">
          <span className="header-title">{ricetta?.name}</span>
          <div className="header-description-wrapper">
            <span
              className="header-description"
              dangerouslySetInnerHTML={{ __html: ricetta?.description }}
            ></span>
          </div>
        </div>
        <ArrowBackIosRoundedIcon onClick={() => {history.goBack();}} className="tornaIndietro"/>
      </div>
    </Contenitore>
  );
}

const Contenitore = styled.div`
  margin: 0 auto 60px auto;
  width: 100%;
  max-width: 800px;
  .header-container {
      height:60vh;
    width: 100%;
    background-image: url(${(props) => props.imgUrl});
    margin-top: 23px;
    background-repeat: no-repeat;
    background-size: cover;
    box-shadow: 0px 10px 10px #eee;
    border-radius: 0px 0px 4px 4px;
    background-position: center center;
    display: flex;
    align-items: flex-end;
    margin: 0 auto;
    position: relative;
    .header-wrapper{
      width:80%;
      margin: 0 auto;
      background: white;
      border-radius: 4px;
      max-width: 400px;
      min-height: 165px;
      text-align: center;
      padding: 30px;
      box-shadow: 0px 10px  10px white;
      position:absolute;
      bottom: -120px;
      right: 0px;
      left: 0px;
     

        }
        .header-title{
            font-weight:bold;
            font-size:18px;
            text-transform:capitalize;
            color:${colors.mainOrange};
                @media only screen and (min-width: ${breakpoints.screenMobBig} ){
                color: ${colors.secondaryGreen};

            }
        }
        .header-description-wrapper{
            margin-top:15px;
            .header-description{
                font-size:15px;
                color:#999;
            }
        }
        button.tornaIndietro {
    padding: 20px;
    background: orange ;
    color: white;
    font-weight: bold;
    border: none;
    border-radius: 8px;
    position: absolute;
    margin: 0 auto;
    margin-bottom: -150px;
    right: 0;
    left: 0;
}
.tornaIndietro{
    font-size: 40px;
    color: ${colors.mainOrange};
    margin-left: 20px;
    position: absolute;
    margin: 0 auto;
    margin-bottom: -150px;
    right: 0;
    left: 0;
    border: 3px solid;
    border-radius: 50%;
    padding: 5px;
  }
  }       
`;
