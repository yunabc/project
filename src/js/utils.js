var u = navigator.userAgent;
export const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
export const isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端