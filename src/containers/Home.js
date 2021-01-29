import { useState, useEffect, useContext} from "react";
import styled from "styled-components";
import MiniaturaRicetta from '../components/MiniaturaRicetta'
import { RicetteContext } from './App';
import Slider from 'react-slick';
import { colors, breakpoints } from '../global-styles';
import bgHome from '../assets/img/bg_home.svg';
import { isMobile, isDevice, mobileType} from '../utils/deviceDetector';

const Home = () => {
const ricetteContesto = useContext(RicetteContext);

const SLIDE_DA_MOSTRARE = isMobile() ? 1 : 3;

const SMARTPHONE = isDevice() ? "Usi un TELEFONINO" : "Usi un COMPUTER";

const OS_MOBILE = mobileType() ? "con Android" : "con iOS";
var sliderSettings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: SLIDE_DA_MOSTRARE, // gli dico di mostrare 3 slide alla volta
  slidesToScroll: SLIDE_DA_MOSTRARE, // gli dico di far vedere altre 3 slide al cambio 'pagina di slide'
}

// const settings = {
//   dots: true,
//   infinite: true,
//   speed: 500,
//   slidesToShow: 3,
//   slidesToScroll: 1,
//   responsive: [
//     {
//       breakpoint: 1170,
//       settings: {
//         slidesToShow: 2,
//         slidesToScroll: 1,
//       }
//     },
//     {
//       breakpoint: 830,
//       settings: {
//         slidesToShow: 1,
//         slidesToScroll: 1
//       }
//     }
//   ]
// };
//console.log(ricetteContesto);
  return (
    <Contenitore>
    <div className="home-main-container"></div>

    <div className="home-slider-container">
        <div className="home-slider-title">
          <span>Le Ricette del giorno:</span>
        </div>
        <Slider className="home-slider-wrapper" {...sliderSettings}>
            { ricetteContesto.chiaviRicette && ricetteContesto.chiaviRicette.map((chiave) =>(
            <MiniaturaRicetta
                chiave={chiave}
                key={chiave}
                titolo={ricetteContesto.oggettoRicette[chiave].name}
                url={ricetteContesto.oggettoRicette[chiave].image.url}
                descrizione={ricetteContesto.oggettoRicette[chiave].description}
                categoria={ricetteContesto.oggettoRicette[chiave].recipeCategory}
                slideShow = {true}
            />
          ))}
        </Slider>
        {SMARTPHONE} {OS_MOBILE} 
    </div>
    </Contenitore>
  );
};

const Contenitore = styled.div`
width: 100%;
  @media only screen and (min-width: ${breakpoints.screenMobBig}) {
    margin: 0 auto 60px auto;
  }
  .home-main-container {
    background: url(${bgHome}) no-repeat center;
    background-size: cover;
    width: 100%;
    height: 400px;
  }
  .home-slider-container {
    padding: 15px 15px;
    max-width: 1280px;
    background-color: ${colors.mainRed};
    @media only screen and (min-width: ${breakpoints.screenMobBig}) {
      border-radius: 6px;
      margin: 30px auto;
    }
    .home-slider-title {
      color: #fff;
      text-transform: uppercase;
      font-size: 14px;
      font-weight: bold;
      letter-spacing: 3px;
      margin-top: 20px;
      margin-left: 30px;
      @media only screen and (min-width: ${breakpoints.screenMobBig}) {
        text-align: center;
        font-size: 18px;
        letter-spacing: 6px;
        font-weight: 500;
        margin-top: 40px;
        margin-bottom: 50px;
      }
    }
    .home-slider-wrapper {
      margin: 30px;
    }
  }

`;
export default Home;
