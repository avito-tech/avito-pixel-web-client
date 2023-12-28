import { Hit } from "./hit";
import type { AvitoPixelParams } from "./types";

export class AvitoPixel {
    private static instance: AvitoPixel;
    hit: Hit;

    constructor({
        host = "",
        platform = 'web',
        paths
    }: AvitoPixelParams) {
        if (AvitoPixel.instance) {
            return AvitoPixel.instance;
        }
        
        this.hit = new Hit({ url: host + paths.hit, platform });
        AvitoPixel.instance = this;
    }

    init(): void {
        this.hit.request({ type: 'load' });
    }
}