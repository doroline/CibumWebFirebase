import React, { useContext } from "react";
import styled from "styled-components";
import Lottie from "react-lottie";
import * as cuoreBatte from '../assets/lottie/cuore-che-batte.json';
import * as cuoreVola from '../assets/lottie/cuoreVola.json';

import { Button } from "@material-ui/core";
import { colors, brackpoints } from "../global-styles";
import { UtenteContext } from "./App";

export default function Login(props) {
  const utenteContesto = useContext(UtenteContext);

  const configAnimazioneLoggato = {
    loop: true,
    autoplay: true, 
    animationData: cuoreBatte.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
  };

  const configAnimazioneNonLoggato = {
    loop: true,
    autoplay: true, 
    animationData: cuoreVola.default,
    rendererSettings: {
        preserveAspectRatio: 'xMidYMid slice'
      }
  };

  if (utenteContesto.utente?.loggato) {
    return (
      <Contenitore>
        <div className="login-header">
          Benvenuti in Cibum!
          <div className="login-subheader">
            Naviga e scopri le ricette che fanno al caso tuo!
          </div>
        </div>
        <Lottie options={configAnimazioneLoggato}
              height={300}
              width={300}
             />
      </Contenitore>
    );
  }
  return (
    <Contenitore>
      <div className="login-header">
        Accedi per avere sempre le tue ricette preferite
      </div>
      <Button className="sign-in" onClick={() => props.loggatiConGoogle()}>
        Accedi con Google
      </Button>
      <Lottie options={configAnimazioneNonLoggato}
              height={300}
              width={300}
             />
    </Contenitore>
  );
}

const Contenitore = styled.div``;
