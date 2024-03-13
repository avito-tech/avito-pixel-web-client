import { AvitoPixel } from '../index';

const currentScript = window.document.currentScript;
const dataHost = currentScript.getAttribute("data-host");
const dataPathsHist = currentScript.getAttribute("data-paths-hit");
const dataPlatform = currentScript.getAttribute("data-platform");

if (dataPathsHist) {
    const instance = new AvitoPixel({
        host: dataHost || undefined,
        platform: dataPlatform || undefined,
        paths: {
            hit: dataPathsHist
        }
    });

    instance.init();

    window['avitoPixel'] = instance;
}