
export function getCookie(key) {
    const cookiePair = document.cookie.split(";")
        .find((cookie) => (cookie.trim().startsWith(`${key}=`)));

    return (cookiePair ? cookiePair.split("=")[1] : "");
}

export function setCookie(key, val) {
    document.cookie = `${key}=${val}`;
}