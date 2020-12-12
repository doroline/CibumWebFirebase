import { useState , useEffect } from "react";

// importiamo gli elementi di material ui che ci occorrono : il menu vero e proprio e gli elementi list, list item e list text per stilizzare i bottoni che avremo nel menu
import Menu from '../components/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import CircularProgress from '@material-ui/core/CircularProgress';

import styled from 'styled-components';


function App() {
  // stato che utilizzeremo per aprire e chiudere il nostro menu laterale. Il menu può solo essere aperto o chiudo, perciò utilizzo un booleano (true/aperto, false/chiuso)
  const [menuVisibile, setMenuVisibile] = useState(false);
  const [loading, setLoading] = useState(true);

  // grazie allo useEffetc rendiamo vero il nostro loading, lo useEffetc è composto da due elementi separati da virgola, il primo è una funzione il secondo è un array vuoto che indica che dovrà far scatenare la funzione quando l'app sarà pronta (il didMount) e allora gli diremo alla funzione di impostare il loading a false
  useEffect(() => {
    setLoading(false);
  }, [])
  const apriChiudiMenu = () => {
    // con il punto esclamativo prima di una variabile andiamo a selezionare il valore opposto di un booleano 
    // (se il valore di menuVisibile è true, noi lo mettiamo a false)
    // questo ci permette di non dover verificare prima di invocare questa funzione se dobbiamo aprire o chiudere il menu: lui lo capirà da solo!
    setMenuVisibile(!menuVisibile);
  };
   if (loading) {
      return(
        <WrapperLoading>
          <CircularProgress />
        </WrapperLoading>
      );
  }
  // questo return verrà letto SOLAMENTE se il loading sarà a false
  return (
    <Wrapper className="App"> 
      <header className="app-header">
        {/* questo bottone determina l'apertura o la chiusura del menu*/}
        <MenuIcon onClick={() => apriChiudiMenu()} />
        <Menu menuVisibile={menuVisibile} apriChiudiMenu={apriChiudiMenu}/>
      </header>
    </Wrapper>
  );
  }
const Wrapper = styled.div`
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

const WrapperLoading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;

    .MuiCircularProgress-colorPrimary {
      color: #e0902c;
  }
`;


export default App;