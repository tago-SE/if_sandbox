export const monchromeColors = [
  "#e2dfde",
  "#c5c0be",
  "#a8a09e",
  "#8b817e",
  "#6e625e",
  "#584e4b",
  "#423a38",
  "#2c2725",
  "#151312"
];

export const greenColors = ["#E1F8F6", "#B5EDE8", "#87C7BA", "#6B9994", "#597476", "#455556"];
export const yellowColors = ["#FFF3CD", "#FFE082", "#FCC74F", "#B08759", "#85744E", "#5F553F"];
export const redColors = ["#FFE9DB", "#FFC9A6", "#FF8569", "#805C5C", "#63504C", "#483D3B"];
export const blueColors = ["#D5F3FC", "#97E2f7", "#4CB0D3", "#5392B2", "#4A6886", "#3D4E5F"];
export const primaryGreen = "#87C7BA";
export const secondaryGreen = "#B5EDE8";
export const primaryYellow = "#FCC74F";
export const secondaryYellow = "#FFE082";
export const primaryRed = "#FF8569";
export const secondaryRed = "#FFC9A6";
export const primaryBlue = "#4CB0D3";
export const secondaryBlue = "#97E2f7";
export const selectedBlue = "#0054F0";
export const primaryColors = [primaryBlue, primaryGreen, primaryRed, primaryYellow];
export const secondaryColors = [secondaryBlue, secondaryGreen, secondaryRed, secondaryYellow];

let colors: string[] = [];
for (let i = 2; i > 0; i--) {
  colors.push(greenColors[i]);
  colors.push(yellowColors[i]);
  colors.push(redColors[i]);
  colors.push(blueColors[i]);
}
for (let i = 3; i < greenColors.length; i++) {
  colors.push(greenColors[i]);
  colors.push(yellowColors[i]);
  colors.push(redColors[i]);
  colors.push(blueColors[i]);
}

export const allColors = colors;

export const getAllColor = (i: number) => {
  return allColors[i % allColors.length];
};
