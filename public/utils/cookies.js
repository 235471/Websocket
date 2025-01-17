function setCookie(cookie) {
  const key = Object.keys(cookie)[0];
  const value = cookie[key];
  document.cookie = `${key}=${value};path=/`;
}

function getCookie(key) {
  return document.cookie
    .split('; ')
    .find((cookie) => cookie.startsWith(`${key}=`))
    ?.split('=')[1];
}

function removeCookie(key) {
  document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00`;
}

export { setCookie, getCookie, removeCookie };
