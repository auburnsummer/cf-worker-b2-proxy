// @ts-ignore
import UPNG from "./UPNG.js";

const THUMBNAIL_WIDTH = 426;
const THUMBNAIL_HEIGHT = 240;

function scaleImage(origWidth: number, origHeight: number, newWidth: number, newHeight: number, frame: ArrayBuffer) {
    const i = new Uint8Array(newWidth * newHeight * 4);
    for (let x = 0; x < newWidth; x++) {
        for (let y = 0; y < newHeight; y++) {
            // todo: implement bilinear scaling here instead of nearest neighbor
            const offset = (y * newWidth + x) * 4;
            const sampleX = Math.floor((x / newWidth) * origWidth);
            const sampleY = Math.floor((y / newHeight) * origHeight);
            const sample = (sampleY * origWidth + sampleX) * 4;
            const slice = new Uint8Array(frame.slice(sample, sample + 4));
            i[offset] = slice[0];
            i[offset+1] = slice[1];
            i[offset+2] = slice[2];
            i[offset+3] = slice[3];
        }
    }
    return i;
}

export function makeThumbnail(t: ArrayBuffer) {
    try {
        const decoded = UPNG.decode(t);
        const {width, height} = decoded;
    
        const ratio = width / height;
    
        const [thumbWidth, thumbHeight] =
            ratio > 1
                ? [THUMBNAIL_WIDTH, Math.ceil(THUMBNAIL_WIDTH / ratio)]
                : [Math.ceil(THUMBNAIL_HEIGHT / ratio), THUMBNAIL_HEIGHT];

    
        const data = UPNG.toRGBA8(decoded);
        const scaled = scaleImage(width, height, thumbWidth, thumbHeight, data[0]);
        return UPNG.encode([scaled], thumbWidth, thumbHeight, 0);
    }
    catch (err) {
        console.log(err);
        return t;
    }
}