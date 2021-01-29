import UAParser from 'ua-parser-js';
var parser = new UAParser();

export const isMobile = () => {
     if(window.innerWidth < 768) {
         return true;
     }
     return false;
}

export const isDevice = () => {
    if(parser.getDevice().type === 'mobile') {
        return true;
    }
    return false;
}

export const mobileType = () => {
    if(parser.getOS().name === 'Android') {
        return true;
    }
    return false;
}