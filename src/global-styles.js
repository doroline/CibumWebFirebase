import { createGlobalStyle } from 'styled-components';

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