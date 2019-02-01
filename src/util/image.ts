import axios from "axios";
import {cache} from "./simplecache";

class Image {
    @cache
    static async downloadImgToBase64(url: string): Promise<string> {
        console.log(`download images ${url}`);
        const response = await axios.get(url, {
            responseType: 'arraybuffer'
        });

        return "data:" + response.headers["content-type"] + ";base64," + Buffer.from(response.data, 'binary').toString('base64');
    }
}

export {Image};
