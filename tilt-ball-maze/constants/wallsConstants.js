const WALLS_THICKNESS = 10;
// hardcoded the walls for now
let WALLS = [
  // horizontal walls. width is the length
  { x: 210, y: 50, width: 120, height: WALLS_THICKNESS },
  { x: 0, y: 100, width: 220, height: WALLS_THICKNESS },
  { x: 210, y: 170, width: 40, height: WALLS_THICKNESS },
  { x: 70, y: 170, width: 80, height: WALLS_THICKNESS },
  { x: 140, y: 250, width: 170, height: WALLS_THICKNESS },
  { x: 0, y: 250, width: 70, height: WALLS_THICKNESS },
  { x: 130, y: 320, width: 170, height: WALLS_THICKNESS },
  { x: 210, y: 500, width: 100, height: WALLS_THICKNESS },
  { x: 290, y: 570, width: 70, height: WALLS_THICKNESS },
  { x: 0, y: 500, width: 140, height: WALLS_THICKNESS },
  { x: 70, y: 575, width: 80, height: WALLS_THICKNESS },
  { x: 300, y: 350, width: 30, height: WALLS_THICKNESS },
  { x: 140, y: 650, width: 120, height: WALLS_THICKNESS },
  { x: 140, y: 725, width: 190, height: WALLS_THICKNESS },
  // vertical walls. height is the length
  { x: 140, y: 0, width: WALLS_THICKNESS, height: 40 },
  { x: 70, y: 60, width: WALLS_THICKNESS, height: 40 },
  { x: 210, y: 50, width: WALLS_THICKNESS, height: 50 },
  { x: 320, y: 50, width: WALLS_THICKNESS, height: 135 },
  { x: 140, y: 175, width: WALLS_THICKNESS, height: 75 },
  { x: 125, y: 320, width: WALLS_THICKNESS, height: 185 },
  { x: 60, y: 250, width: WALLS_THICKNESS, height: 185 },
  { x: 300, y: 250, width: WALLS_THICKNESS, height: 185 },
  { x: 300, y: 325, width: WALLS_THICKNESS, height: 175 },
  { x: 320, y: 650, width: WALLS_THICKNESS, height: 80 },
  { x: 210, y: 500, width: WALLS_THICKNESS, height: 150 },
  { x: 140, y: 500, width: WALLS_THICKNESS, height: 80 },
  { x: 70, y: 580, width: WALLS_THICKNESS, height: 160 },
  { x: 140, y: 650, width: WALLS_THICKNESS, height: 80 },
  { x: 200, y: 730, width: WALLS_THICKNESS, height: 25 },
];

export { WALLS, WALLS_THICKNESS };
