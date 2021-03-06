import { useState } from "react";

import {
  useHistory,
  useLocation,
} from "react-router-dom";
import {ROTTE} from '../costanti';

import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Switch from "@material-ui/core/Switch";
import Button from '@material-ui/core/Button';


const Menu = (props) => {
  // costanti per gli Hook di Routing
 const listaRottePrecedenti = useHistory();
 const rottaCorrente = useLocation();

  const cambiaRotta = (nuovaRotta) => {
    listaRottePrecedenti.push(nuovaRotta);
    props.apriChiudiMenu();
  };

  //costanti e metodi per il cambio di colore dello switch -- inizio cambio di colore
  const [state, setState] = useState({checkedA: false});
  const [colore, setColore]=useState("bgWhite");

  const cambiaColore = () =>{
    if (colore==="bgWhite"){
      setColore('bgBlack');
    }else{
      setColore('bgWhite');
    }
  }

  const handleChange = (event) => {
    setState({[event.target.name]: event.target.checked });
  };

  const dueFunzioniInsieme = (e) =>{
   handleChange(e);
  cambiaColore();
  }
// fine cambio di colore
  return (
    <>
      {/* 
        qui inizia il menu, con l'elemento SwipeableDrawer che contiene tutti i bottoni con i nomi delle sezione della mia APP 
        anchor indica la posizione da cui il menu si aprirà
        open indica se il menu è aperto o chiuso
        onClose e onOpen sono eventi legati allo swipe dell'utente (in generale per noi è importante invocare una sola funzione: apriChiudiMenu)
      */}
      <SwipeableDrawer
        anchor="right"
        open={props.menuVisibile}
        onClose={() => props.apriChiudiMenu()}
        onOpen={() => props.apriChiudiMenu()} 
        className={colore}
      >
        {/* List svolge il ruolo di <ul> e ListItem quello di <li>: in questo caso potrei utilizzare una costante ed eseguire un .map per ciclarmi tutte le pagine della mia app che voglio elencare */}
        <List style={{ backgroundColor: colore }}>
        <ListItem button key="ciao">
            {props.utente.loggato && (
                <div>
                  Ciao <br />{props.utente.nome}{" "}
                  <img src={props.utente.foto} className="fotoUtente" />
                </div>
            )}
          </ListItem>
  
          <ListItem button key="Home" onClick={()=> cambiaRotta(ROTTE.HOME)}>
            <ListItemText primary="Home page" />
          </ListItem>
          <ListItem button key="Ricette" onClick={()=> cambiaRotta(ROTTE.RICETTE)}>
            <ListItemText primary="Ricette" />
          </ListItem>
          <ListItem button key="Lista della Spesa" onClick={() => cambiaRotta(ROTTE.LISTA_DELLA_SPESA)}>
            <ListItemText primary="Lista della Spesa" />
          </ListItem>
          <ListItem button key="Preferiti" onClick={() => cambiaRotta(ROTTE.PREFERITI)}>
            <ListItemText primary="Preferiti" />
          </ListItem>
        </List>
        {!props.utente.loggato && (
          <Button onClick={() => props.loggatiConGoogle()}>Accedi con Google</Button>
        )}
        {props.utente.loggato && (
          <div>
            <Button onClick={() => props.logout()}>ESCI</Button>
          </div>
        )}

        <div className="contenitoreSwitch">
      sfondo chiaro
      <Switch
        checked={state.checkedA}
        onChange={e => dueFunzioniInsieme(e)}
        name="checkedA"
        inputProps={{ "aria-label": "primary checkbox" }}
      />
      sfondo scuro
    </div>
      </SwipeableDrawer>
    </>
  );
};

export default Menu;
