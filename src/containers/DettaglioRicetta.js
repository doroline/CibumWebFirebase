import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useParams, useHistory } from "react-router-dom";
import { RicetteContext } from "./App";
import { colors, breakpoints } from "../global-styles";
import moment from "moment";
import {
  WhatsappShareButton,
  EmailShareButton,
  FacebookShareButton,
  WhatsappIcon,
  EmailIcon,
  FacebookIcon,
} from "react-share";

import { Menu, IconButton } from "@material-ui/core";
import { Share } from "@material-ui/icons";

import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';

import { UtenteContext } from "../containers/App";

import ArrowBackIosRoundedIcon from "@material-ui/icons/ArrowBackIosRounded";

export default function DettaglioRicetta(props) {
  const contestoRicette = useContext(RicetteContext);
  const contestoUtente = useContext(UtenteContext);

  const { chiave } = useParams();

  const [apriChiudShareMenu, setApriChiudiShareMenu] = useState(null);

  const ricetta = contestoRicette.oggettoRicette[chiave];

  const listaRottePrecedenti = useHistory();

  const gestisciPreferito = () =>{
    contestoUtente.togglePreferito(chiave);
  };
console.log(chiave);
  return (
    <Contenitore imgUrl={ricetta?.image?.url}>
      <div className="header-container">
        <div className="header-wrapper">
          <IconButton
            className="share btn"
            aria-label="condivi"
            onClick={(e) => setApriChiudiShareMenu(e.currentTarget)}
          >
            <Share htmlColor={colors.mainOrange} />
          </IconButton>
          <Menu
            id="share-menu"
            className="share-menu"
            keepMounted
            anchorEl={apriChiudShareMenu}
            open={Boolean(apriChiudShareMenu)}
            onClose={() => setApriChiudiShareMenu(null)}
          >
            <WhatsappShareButton
              // title={ricetta?.name + ": "}
              title={`Ciao, dai un occhiata a questa ricetta, *${ricetta?.name}* : `}
              url={window.location.href}
              children={
                <WhatsappIcon className="share-btn" size={32} round={true} />
              } // si occupa di mostrare l'elemento che gli andiamo ad inserire dentro
            />
            <FacebookShareButton
              quote={`Ciao, dai un occhiata a questa ricetta, ${ricetta?.name} : `}
              url={window.location.href}
              children={
                <FacebookIcon className="share-btn" size={32} round={true} />
              } 
            />
            <EmailShareButton
              title={`Ciao, dai un occhiata a questa ricetta, ${ricetta?.name} : `}
              url={window.location.href}
              children={
                <EmailIcon className="share-btn" size={32} round={true} />
              } 
            />
          </Menu>
          <span className="header-title">{ricetta?.name}</span>
          <div className="header-description-wrapper">
            <span
              className="header-description"
              dangerouslySetInnerHTML={{ __html: ricetta?.description }}
            ></span>
          </div>
        </div>
      </div>

      <div className="main-container">
        <div className="ingredients-container">
          {ricetta?.recipeIngredient.map((ingrediente, indice) => (
            <div id={indice}>
              <span>{ingrediente}</span>
            </div>
          ))}
        </div>
        <div className="info-container">
          {ricetta?.recipeYield && (
            <div>
              <span>{ricetta.recipeYield} Persone</span>
            </div>
          )}

          {ricetta?.prepTime && (
            <div>
              <span>{moment.duration(ricetta.prepTime).asMinutes()} Min</span>
            </div>
          )}
        </div>
        {contestoUtente?.utente?.loggato && ( 
        <IconButton onClick={()=> gestisciPreferito()}>
              {contestoUtente.isPreferito(chiave) ? <FavoriteIcon htmlColor={colors.mainOrange}/> : <FavoriteBorderIcon htmlColor={colors.mainOrange}/>}
          </IconButton>
        )}
      </div>

      <div className="contenitoreTorna">
        <ArrowBackIosRoundedIcon
          onClick={() => {
            listaRottePrecedenti.goBack();
          }}
          className="tornaIndietro"
        />
      </div>
    </Contenitore>
  );
}

const Contenitore = styled.div`
  margin: 0 auto 60px auto;
  width: 100%;
  max-width: 800px;
  .header-container {
    height: 60vh;
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
    .header-wrapper {
      width: 80%;
      margin: 0 auto;
      background: white;
      border-radius: 4px;
      max-width: 400px;
      min-height: 165px;
      text-align: center;
      padding: 30px;
      box-shadow: 0px 10px 10px white;
      position: absolute;
      top: 300px;
      right: 0px;
      left: 0px;

      .btn{
        position: absolute;
        background-color: white;
        top: -25px;
        right: 0px;
        &.share {
          right:106;
        }

      }
    }
    .header-title {
      font-weight: bold;
      font-size: 18px;
      text-transform: capitalize;
      color: ${colors.mainOrange};
      @media only screen and (min-width: ${breakpoints.screenMobBig}) {
        color: ${colors.secondaryGreen};
      }
    }
    .header-description-wrapper {
      margin-top: 15px;
      .header-description {
        font-size: 15px;
        color: #999;
      }
    }
  }

  .main-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    margin: auto;
    margin-top: 90px;
    width: 60%;
    .ingredients-container {
      display: block;
      padding: 30px 0px;
      margin: 0px;
      width: 50%;
    }
    .info-container {
      display: block;
      text-align: left;
      width: 50%;
      padding: 30px;
    }
  }
  .contenitoreTorna {
    width: 100%;
    text-align: center;
  }
  .tornaIndietro {
    font-size: 40px;
    color: ${colors.mainOrange};
    border: 3px solid;
    border-radius: 50%;
    padding: 5px;
  }
`;
