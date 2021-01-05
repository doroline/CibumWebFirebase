import { useState, useEffect, createContext } from "react";
import Home from "./Home";
import Ricette from "./Ricette";
import ListaSpesa from "./ListaSpesa";

// importiamo gli elementi di material ui che ci occorrono : il menu vero e proprio e gli elementi list, list item e list text per stilizzare i bottoni che avremo nel menu
import Menu from "../components/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import CircularProgress from "@material-ui/core/CircularProgress";

import styled from "styled-components";
import firebase from "firebase";
import firebaseConfig from "../firebase-config";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ROTTE } from "../costanti";

firebase.initializeApp(firebaseConfig);

function onUtenteLoggato(utenteLoggatoCallBack) {
  // eseguirà questo codice del return, interno al metodo, quando l'utente si sarà loggato o sloggato
  return firebase.auth().onAuthStateChanged((utenteParametro) => {
    if (utenteParametro) {
      // così vuol dire che è loggato
      console.log("utenteParametro: ", utenteParametro); // cosi possiamo vedere quali dati ci passa firebase
      utenteLoggatoCallBack({
        loggato: true,
        nome: utenteParametro.displayName,
        email: utenteParametro.email,
        foto: utenteParametro.photoURL,
        uid: utenteParametro.uid,
      });
    } else {
      utenteLoggatoCallBack({
        loggato: false,
      });
    }
  });
}

const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

const loggatiConGoogle = () => {
  auth.signInWithPopup(provider);
};

const logout = () => {
  firebase.auth().signOut();
};

export const RicetteContext = createContext();

function App() {
  // stato che utilizzeremo per aprire e chiudere il nostro menu laterale. Il menu può solo essere aperto o chiudo, perciò utilizzo un booleano (true/aperto, false/chiuso)
  const [menuVisibile, setMenuVisibile] = useState(false);
  const [loading, setLoading] = useState(true);

  const [utente, setUtente] = useState({ loggato: false });

  // grazie allo useEffetc rendiamo vero il nostro loading, lo useEffetc è composto da due elementi separati da virgola, il primo è una funzione il secondo è un array vuoto che indica che dovrà far scatenare la funzione quando l'app sarà pronta (il didMount) e allora gli diremo alla funzione di impostare il loading a false
  useEffect(() => {
    function utenteLoggatoCallBack(utenteObj) {
      // una CallBack è una chiamata ad una funzione, che dovrà avvenire soltanto ad un certo momento e non seguirà il normale flusso degli eventi, in questo caso si avvierà soltanto dopo che firebase ci avrà restituito il "loggato:true" al nostro parametro "utenteObj" e ci permetterà di invocare i cambi di stato anche al di fuori del nostro componente!
      setUtente(utenteObj);
      setLoading(false); // questa è quella che determina la fine del loading e la spostiamo qui dentro perchè io voglio assicurarmi che il loading scompaia solo dopo che Firebase mi avrà restituito i dati dell'utente, altrimenti potrebbe scomparire il login, comparire l'app, ma ancora non ho i dati dell'utente
    }
    onUtenteLoggato(utenteLoggatoCallBack); // funzione che intercetta l'avvenuto cambio di stato della login
  }, []);

  useEffect(() => {
    // questo useEffect eseguirà il codice al suo interno, tutte le volte che lo stato di utente muterà, perchè abbiamo messo "utente" nelle quadre finali
    if (utente.uid) {
      // se esiste lo user ID, per cui l'utente è loggato
      const utenteReferenza = firebase.database().ref("/utenti/" + utente.uid);
      utenteReferenza.once("value", (utenteDb) => {
        // once è tipo "on" con la differenza che viene eseguita una volta sola
        const cloneUtenteDb = utenteDb.val(); // come prima cosa andiamo a leggere e prenderci tutti i valori, i nodi principali del DB per verificare se nel db c'è già un nodo con lo stesso uid
        if (cloneUtenteDb) {
          // così verifico se l'utente già esiste
          return null; // ok allora non fare nulla
        } else {
          // se invece non esiste
          utenteReferenza.set({
            email: utente.email,
            nome: utente.nome,
            foto: utente.foto,
          });
        }
      });
    }
  }, [utente]);

  const apriChiudiMenu = () => {
    // con il punto esclamativo prima di una variabile andiamo a selezionare il valore opposto di un booleano
    // (se il valore di menuVisibile è true, noi lo mettiamo a false)
    // questo ci permette di non dover verificare prima di invocare questa funzione se dobbiamo aprire o chiudere il menu: lui lo capirà da solo!
    setMenuVisibile(!menuVisibile);
  };
  if (loading) {
    return (
      <ContenitoreLoading>
        <CircularProgress />
      </ContenitoreLoading>
    );
  }
  // questo return verrà letto SOLAMENTE se il loading sarà a false
  return (
    <RicetteContext.Provider value={"sono l'info che cercavi"}>
      <Router>
        <Contenitore className="App">
          <header className="app-header">
            {/* questo bottone determina l'apertura o la chiusura del menu*/}
            <MenuIcon onClick={() => apriChiudiMenu()} />
            <Menu
              menuVisibile={menuVisibile}
              apriChiudiMenu={apriChiudiMenu}
              logout={logout}
              loggatiConGoogle={loggatiConGoogle}
              utente={utente}
            />
          </header>
          <div className="app-corpo">
            <Switch>
              <Route path={ROTTE.RICETTE}>
                <Ricette />
              </Route>
              <Route exact path={ROTTE.LISTA_DELLA_SPESA}>
                <ListaSpesa />
              </Route>
              <Route path={ROTTE.HOME}>
                <Home />
              </Route>
            </Switch>
          </div>
        </Contenitore>
      </Router>
    </RicetteContext.Provider>
  );
}
const Contenitore = styled.div`
  .app-header {
    background-color: #e0902c;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 20px;
    font-size: 20px;
    color: white;
    text-align: right;
  }
`;

const ContenitoreLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

  .MuiCircularProgress-colorPrimary {
    color: #e0902c;
  }
`;

export default App;
