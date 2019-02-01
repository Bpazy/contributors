import axios from "axios";

async function downloadImgToBase64(url: string): Promise<string> {
    const response = await axios.get(url, {
        responseType: 'arraybuffer'
    });

    return "data:" + response.headers["content-type"] + ";base64," + Buffer.from(response.data, 'binary').toString('base64');
}

export default {downloadImgToBase64}
