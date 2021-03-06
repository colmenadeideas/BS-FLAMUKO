export function getCookie(cname) {
    const name = cname + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

export function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const decodeLocalData = () => {
    //Toma los datos almacenados en localStorage y los vuelve JSON
    const data = JSON.parse(localStorage.getItem('LTP_sesion'))

    if(!data) return {email: "", sesion: "", estado: ""}

    const email = atob('dW5kZWZpbmVk')
    console.log(email)
    const {sesion, estado} = data
    return {email, sesion, estado}
}