export function hexToHSL(H) {

    // Convert hex to RGB first
    let r = 0, g = 0, b = 0;
    if (H.length === 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length === 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r,g,b),
        cmax = Math.max(r,g,b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
  
    if (delta === 0)
      h = 0;
    else if (cmax === r)
      h = ((g - b) / delta) % 6;
    else if (cmax === g)
      h = (b - r) / delta + 2;
    else
      h = (r - g) / delta + 4;
  
    h = Math.round(h * 60);
  
    if (h < 0)
      h += 360;
  
    l = (cmax + cmin) / 2;
    s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return "hsl(" + h + "," + s + "%," + l + "%)";
}

export function hexToRGB(h) {
    let r = 0, g = 0, b = 0;
  
    // 3 digits
    if (h.length == 4) {
      r = "0x" + h[1] + h[1];
      g = "0x" + h[2] + h[2];
      b = "0x" + h[3] + h[3];
  
    // 6 digits
    } else if (h.length == 7) {
      r = "0x" + h[1] + h[2];
      g = "0x" + h[3] + h[4];
      b = "0x" + h[5] + h[6];
    }
    return {red: +r, green: +g, blue: +b}
    // return "rgb("+ +r + "," + +g + "," + +b + ")";
}


export function ChangeTextColor(h){
    const color = h === "" ? "#FFFFFF" : h
    const colorRGB = hexToRGB(color)
    const r = colorRGB.red * 0.2126
    const g = colorRGB.green * 0.7152
    const b = colorRGB.blue * 0.0722
    const sum = r + g + b 
    const threshold = 0.5;
    const perceivedLightness = sum / 255
    const light = perceivedLightness - threshold
    const lightness = light * (-100000)
    const textColor  = `hsl(0, 0%, ${lightness}%)`
    
    return {backgroundColor: color, color: textColor}
}