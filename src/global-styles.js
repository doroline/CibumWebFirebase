import { createGlobalStyle } from 'styled-components';

export const colors = {
mainOrange : '#e0902c',
 mainRed : '#f44336',
 primaryGreen : '#4eb87b',
 secondaryGreen : '#68f6a4',
};

export const breakpoints = {
   screenMobXSmall: '320px',
   screenMobSmall: '375px',
   screenMobMid: '411px',
   screenMobMedium: '600px',
   screenMobBig: '768px',
   screenDeskSmall: '960px',
   screenDeskMid: '1300px',
};

const GlobalStyles = createGlobalStyle`
  .fotoUtente{
    border-radius: 50%!important;
    width: 35px!important;
    vertical-align: middle!important;
    margin-left: 10px!important;
    margin-right: 10px!important;
  }
  .menuLaterale{
    background-color:red!important;
  }
  .bgBlack{
    .MuiDrawer-paper {
      background-color: #333332;
      color:white;
    }
  }
  .bgWhite{
    .MuiDrawer-paper {
      background-color: white;
      color:black;
    }
  }
  .MuiDrawer-paper {
    width: 60%;
  }
  .MuiButton-label {
    width: 100%;
    display: inherit;
    align-items: inherit;
    justify-content: inherit;
    background: #5779d8;
    color: white;
    padding: 8px;
    border-radius: 6px;
}

.MuiSwitch-colorSecondary.Mui-checked + .MuiSwitch-track {
    background-color: #737373!important;
}
.MuiSwitch-colorSecondary.Mui-checked {
    color: #080706!important;
}
.contenitoreSwitch{
  font-size: 11px;
    text-align: center;
}
`;

export default GlobalStyles;