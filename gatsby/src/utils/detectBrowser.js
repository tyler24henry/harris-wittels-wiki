export const getIsChrome = () => {
    const ua = navigator.userAgent.toLowerCase(); 
        if (ua.indexOf('safari') != -1) { 
        if (ua.indexOf('chrome') > -1) {
            return 1;
        } else {
            return 2;
        }
    }
}