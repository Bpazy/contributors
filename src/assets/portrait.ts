const svgMain = `<?xml version="1.0" encoding="utf-8"?>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"
    width="100%" height="100%">
        {svg}
    </svg>
    `;

const svgA = `<defs>
            <pattern id="avatar" width="100%" height="100%" patternContentUnits="objectBoundingBox">
                <image id="avatar" width="1" height="1" xlink:href="{imgUrl}"/>
            </pattern>
            <style>
                circle {
                    stroke: #c5c8cd;
                    stroke-width: 3px;
                }
            </style>
        </defs>
        <a href="{href}"><circle cx="{cx}" cy="{cy}" r="24" fill="url(#avatar)"/></a>
    `;

interface Portrait {
    avatarUrl: string
    href: string
}

function build(portraits: Portrait[]): string {
    let aArrString = "";
    for (let i = 0; i < portraits.length; i++) {
        const cx = 6 + 6 * i + 24 + i * 48;
        aArrString += svgA.replace('{href}', portraits[i].href)
            .replace('{imgUrl}', portraits[i].avatarUrl)
            .replace('{cx}', cx + '') // Set avatar X coordinate
            .replace('{cy}', 30 + '') // Set avatar Y coordinate
    }
    return svgMain.replace("{svg}", aArrString)
        .replace(/\r?\n|\r/g, '') // Remove white space

}

export {Portrait}
export default {build}
