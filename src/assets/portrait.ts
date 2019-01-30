const svgMain = `<?xml version="1.0" encoding="utf-8"?>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"
    width="100%" height="100%">
        {svg}
    </svg>
    `;

const svgA = `<defs>
            <pattern id="{avatarId}" width="100%" height="100%" patternContentUnits="objectBoundingBox">
                <image width="1" height="1" xlink:href="{imgHref}"/>
            </pattern>
            <style>
                circle {
                    stroke: #c5c8cd;
                    stroke-width: 3px;
                }
            </style>
        </defs>
        <a href="{htmlUrl}"><circle cx="{cx}" cy="{cy}" r="24" fill="url(#{avatarId})"/></a>
    `;

interface Portrait {
    avatarHref: string
    htmlUrl: string
}

const padding = 6;
const radius = 24;
const diameter = radius * 2;

function build(portraits: Portrait[], lineNumber: number = 10): string {
    let aArrString = "";
    for (let i = 0; i < portraits.length; i++) {
        const curLine = Math.floor(i / lineNumber);
        const curLineIndex = i % lineNumber;

        const cx = padding + padding * curLineIndex + radius + curLineIndex * diameter;
        const cy = padding + padding * curLine + radius + curLine * diameter;

        aArrString += svgA.replace('{htmlUrl}', portraits[i].htmlUrl)
            .replace(/{imgHref}/g, portraits[i].avatarHref)
            .replace(/{avatarId}/g, 'avatarId' + i)
            .replace(/{cx}/g, cx + '') // Set avatar X coordinate
            .replace(/{cy}/g, cy + ''); // Set avatar Y coordinate
    }
    return svgMain.replace("{svg}", aArrString)
        .replace(/\r?\n|\r/g, '') // Remove white space
}

export {Portrait}
export default {build}
