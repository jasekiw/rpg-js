import {Resources} from "./Resources";
export function getTime() {
    var d = new Date();
    return d.getTime();
}

export function replaceAll(find, replace, str) {
    return str.replace(new RegExp(find, 'g'), replace);
}

export function addElementBackground(x, y) {
    var ni = document.getElementById('gameBackground');
    var newDiv = document.createElement('img');
    var divIdName = 'img' + x + ";" + y;
    newDiv.setAttribute('id', divIdName);
    newDiv.setAttribute('src', Resources.grass);
    newDiv.setAttribute('width', '100px');
    newDiv.setAttribute('height', '100px');
    newDiv.style.position = 'absolute';
    newDiv.style.left = (x * 100) + 'px';
    newDiv.style.top = (y * 100) + 'px';
    ni.appendChild(newDiv);
}

export function getValueFromCss(pixels) {
    return Number(pixels.substring(0, pixels.indexOf('px')));
}
export function getLeftOfElement(elem) {
    return getValueFromCss(elem.style.left);
}
export function getTopOfElement(elem) {
    return getValueFromCss(elem.style.top);
}