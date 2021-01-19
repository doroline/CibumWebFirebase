import { useContext} from "react";
import { useHistory } from 'react-router-dom';
import { ROTTE } from '../costanti';
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { colors } from '../global-styles';

import { UtenteContext } from "../containers/App";

const MiniaturaRicetta = (props) => {

  const listaRottePrecedenti = useHistory();
  const contestoUtente = useContext(UtenteContext);

  const cambiaRotta = (nuovaRotta) => {
    listaRottePrecedenti.push(nuovaRotta);
  };

  const gestisciPreferito = (evento) =>{
    evento.stopPropagation();
    contestoUtente.togglePreferito(props.chiave);
  };
//console.log(props.chiave);
  return (
    <Contenitore>
      <Card className="card" onClick={() =>cambiaRotta(ROTTE.DETTAGLIO_RICETTA + '/' + props.chiave)}>
     
        <CardHeader title={props.titolo} subheader={props.categoria} />
        <CardMedia
          className="card-media"
          image={props.url}
          title={props.titolo}
        />
        <CardContent>
          <div>
          {props.descrizione}
          </div>
        </CardContent>
     {contestoUtente?.utente?.loggato && (   
       <CardActions disableSpacing>
          <IconButton onClick={(evento)=> gestisciPreferito(evento)}>
              {contestoUtente.isPreferito(props.chiave) ? <FavoriteIcon htmlColor={colors.mainOrange}/> : <FavoriteBorderIcon htmlColor={colors.mainOrange}/>}
          </IconButton>
        </CardActions>
        )}
      </Card>
    </Contenitore>
  );
};

const Contenitore = styled.div`
  padding: 10px;
  .card {
    width: 350px;
  }
  .card-media {
    height: 0;
    padding-top: 56.25%;
  }
`;
export default MiniaturaRicetta;
