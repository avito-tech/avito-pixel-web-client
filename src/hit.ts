import { AvitoPixelParams } from "./types";

type HitParams = {
    url: string;
    platform: AvitoPixelParams['platform']
}

type HitRequestIn = {
    type: 'load' | 'location_changed';
}

type HitRequestOut = {
    ok: boolean;
}

type HitRequestBody = HitRequestIn & {
    meta: {
        platform: AvitoPixelParams['platform']
    }
}

export class Hit { 
    url: HitParams['url'];
    platform: HitParams['platform'];

    constructor({ url, platform }: HitParams) {
        this.url = url;
        this.platform = platform;
    }

    async request({ type }: HitRequestIn): Promise<HitRequestOut> {
        try {
            const body: HitRequestBody = {
                type, 
                meta: {
                    platform: this.platform
                }
            }
            const response = await fetch(this.url, {
                method: 'POST',
                body: JSON.stringify(body)
            });
            const result = await response.json();
            if (!result.ok) {
                throw new Error('Request failed');
            }

            return result;
        } catch (error) {
            console.error(`Error sending hit to ${this.url}`, error);
        }
    }
}