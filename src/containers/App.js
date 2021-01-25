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
import DettaglioRicetta from "./DettaglioRicetta";
import Preferiti from "./Preferiti";
import Login from "./Login";

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
export const UtenteContext = createContext();

function App() {
  // qui creo le variabili di stato per prendere i dati dal nodo ricette di firebase
  const [chiaviRicette, setChiaviRicette] = useState([]); // la inizializzo come un array vuota
  const [oggettoRicette, setOggettoRicette] = useState({}); // la inizializzo come oggetto

  // stato che utilizzeremo per aprire e chiudere il nostro menu laterale. Il menu può solo essere aperto o chiudo, perciò utilizzo un booleano (true/aperto, false/chiuso)
  const [menuVisibile, setMenuVisibile] = useState(false);
  const [loading, setLoading] = useState(true);

  const [utente, setUtente] = useState({ loggato: false });

  const [preferiti, setPreferiti] = useState({});

  const [listaSpesa, setListaSpesa] = useState({});

  // grazie allo useEffetc rendiamo vero il nostro loading, lo useEffetc è composto da due elementi separati da virgola, il primo è una funzione il secondo è un array vuoto che indica che dovrà far scatenare la funzione quando l'app sarà pronta (il didMount) e allora gli diremo alla funzione di impostare il loading a false
  useEffect(() => {
    function utenteLoggatoCallBack(utenteObj) {
      // una CallBack è una chiamata ad una funzione, che dovrà avvenire soltanto ad un certo momento e non seguirà il normale flusso degli eventi, in questo caso si avvierà soltanto dopo che firebase ci avrà restituito il "loggato:true" al nostro parametro "utenteObj" e ci permetterà di invocare i cambi di stato anche al di fuori del nostro componente!
      setUtente(utenteObj);
      setLoading(false); // questa è quella che determina la fine del loading e la spostiamo qui dentro perchè io voglio assicurarmi che il loading scompaia solo dopo che Firebase mi avrà restituito i dati dell'utente, altrimenti potrebbe scomparire il login, comparire l'app, ma ancora non ho i dati dell'utente
    }
    onUtenteLoggato(utenteLoggatoCallBack); // funzione che intercetta l'avvenuto cambio di stato della login

    const ricetteReferenza = firebase.database().ref("/ricette");
    ricetteReferenza.on("value", (ricetteDb) => {
      // prendo i valori,value, e li metto in ricetteDb
      const ricetteObj = ricetteDb.val(); // passo i valori di ricetteDb a ricetteObj
      const ricetteArray = Object.keys(ricetteObj); // questa funziona JS ci restituisce sottonforma di array soltanto le chiavi sotto forma di oggetto
      setOggettoRicette(ricetteObj);
      setChiaviRicette(ricetteArray);
      console.log(chiaviRicette);
    });
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
          // se ho dei preferiti nel mio db, li aggiungo al mio stato preferiti di react appena mi loggo!
          if (cloneUtenteDb.preferiti) {
            setPreferiti(cloneUtenteDb.preferiti);
          }
          if(cloneUtenteDb.listaSpesa){
            setListaSpesa(cloneUtenteDb.listaSpesa);
          }
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

  // GESTIONE PREFERITI
  const aggiungiPreferito = (id) => {
    // aggiungo al mio db, nel nodo utente loggato il mio nuovo preferito, generando una nuova chiave univoca id
    const preferitoRef = firebase
      .database()
      .ref(`/utenti/${utente.uid}/preferiti`)
      .push(id);
    const chiavePreferito = preferitoRef.key; // estraggo la chiave

    // creo il nuovo oggetto di preferito a partire da quelli già presenti clonando il miostato preferiti
    const nuoviPreferiti = { ...preferiti };
    nuoviPreferiti[chiavePreferito] = id;

    // e qui aggiungo il nuovo preferito
    setPreferiti(nuoviPreferiti);
  };

  const rimuoviPreferito = (id) => {
    const chiaveDaRimuovere = Object.keys(preferiti).find((chiave) => preferiti[chiave] === id); // trasformo lo stato preferiti in un array di chiavi (con Object.keys), e la scorro, lo ciclo, tutto e poi vado a cercare (con il find che si usa con le array) quel elemento che associato ad una chiave particolare  (chiave) sarà uguale al valore di ID che gli stiamo passando

    // rimuoviamo il preferito da firebase utilizzando il metodo remove
    const preferitoRef = firebase
      .database()
      .ref(`/utenti/${utente.uid}/preferiti/${chiaveDaRimuovere}`)
      .remove();

    // creo il nuovo oggetto di preferito a partire da quelli già presenti clonando il miostato preferiti
    const nuoviPreferiti = { ...preferiti };

    // rimuovo il preferito dal mio oggetta appena clonato
    delete nuoviPreferiti[chiaveDaRimuovere];

    setPreferiti(nuoviPreferiti);
  };

  const isPreferito = (id) => {
    // questo metodo serve a verificare se una ricetta fa o meno parte dei preferiti
    //ciclo l'oggeto preferiti e mi trovo se è presente  l'id specificato nell'input (id), se c'è avrò il suo indice nell'array, altrimenti il valore restituito è -1, perchè il findIndex funziona cosi, se trova bene altrimenti mette -1
    const chiavePreferito = Object.keys(preferiti).findIndex(
      (chiave) => preferiti[chiave] === id
    );
    if (chiavePreferito >= 0) {
      return true;
    } else {
      return false;
    }
  };

  const togglePreferito = (id) => {
    if (isPreferito(id)) {
      return rimuoviPreferito(id);
    } else {
      return aggiungiPreferito(id);
    }
  };
// FINE GESTIONE PREFERITI


// GESTIONE LISTA DELLA SPESA
const aggiungiElemInListaSpesa = (id) =>{
  const ingredientiArray = oggettoRicette[id]?.recipeIngredient.reduce((accumulatore, valoreCorrente) => {
      const nuovoIngrediente = { value: valoreCorrente, checked: false};
      accumulatore.push(nuovoIngrediente);
      return accumulatore;
  }, []); // il secondo paramentro stabilisce quale valore in output vogliamo, delle [] se voglio un array o dell {} se voglio un oggetto
  if(ingredientiArray){
    const listaSpesaRef = firebase.database().ref(`/utenti/${utente.uid}/listaSpesa/${id}`).set(ingredientiArray);
    const nuovaListaSpesa = {...listaSpesa};// mi copio l'attuale lista della spesa
    nuovaListaSpesa[id] = ingredientiArray;// gli dico di aggiungere all'elemento con quell'id specifico, es: cannelloni, gli ingredientiArray
    setListaSpesa(nuovaListaSpesa); // rimposto nuovamente la lista della spesa con l'aggiunta del nuovo e elemento e dei suoi ingredienti
  }
};

const rimuoviElemInListaSpesa = (id) => {
  const listaSpesaRef = firebase.database().ref(`/utenti/${utente.uid}/listaSpesa/${id}`).remove();
  const nuovaListaSpesa = {...listaSpesa};
  delete nuovaListaSpesa[id];
  setListaSpesa(nuovaListaSpesa); 
}

const isInListaSpesa = (id) => {
  if (listaSpesa[id]) { // così gli dico, SE esiste nella var listaSpesa un oggetto con quel id che gli passeremo, restituiscimi il true
    return true;
  } else {
    return false;
  }
};

const toggleElemInListaSpesa = (id) => {
  if (isInListaSpesa(id)) {
    return rimuoviElemInListaSpesa(id);
  } else {
    return aggiungiElemInListaSpesa(id);
  }
};

const toggleCheckIngredienti = (id, index) =>{
  const isChecked = listaSpesa[id][index]?.checked; // qui verifico se checked di quel nodo specifico con l'id (es cannelloni) di quel determinato ingrediente preso con l'index dell'array, sia a true o a false
  const checkedRef = firebase.database().ref(`/utenti/${utente.uid}/listaSpesa/${id}/${index}/checked`).set(!isChecked); // qui gli dico di scrivere nel db esattamente nel nodo checked il CONTRARIO di coa dice la costante isChecked, così l'imposterà a true se era a false, e viceversa, facendo da TOGGLE
  const nuovaListaSpesa = {...listaSpesa};
  nuovaListaSpesa[id][index].checked = !isChecked;
  setListaSpesa(nuovaListaSpesa);
};

// FINE GESTIONE LISTA DELLA SPESA
  if (loading) {
    return (
      <ContenitoreLoading>
        <CircularProgress />
      </ContenitoreLoading>
    );
  }
  // questo return verrà letto SOLAMENTE se il loading sarà a false
  return (
    <RicetteContext.Provider
      value={{
        chiaviRicette,
        oggettoRicette,
      }}
    >
      <UtenteContext.Provider
        value={{
          utente,
          togglePreferito,
          isPreferito,
          isInListaSpesa,
          toggleCheckIngredienti,
          toggleElemInListaSpesa,
          listaSpesa,
        }}
      >
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
                <Route exact path={ROTTE.DETTAGLIO_RICETTA + "/:chiave"}>
                  <DettaglioRicetta chiave="/:chiave"/>
                </Route>
                <Route exact path={ROTTE.PREFERITI}>
                  <Preferiti />
                </Route>
                <Route exact path={ROTTE.LOGIN}>
                  <Login loggatiConGoogle={loggatiConGoogle}/>
                </Route>
                <Route path={ROTTE.HOME}>
                  <Home />
                </Route>
              </Switch>
            </div>
          </Contenitore>
        </Router>
      </UtenteContext.Provider>
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
