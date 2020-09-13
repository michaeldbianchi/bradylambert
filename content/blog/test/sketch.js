export default function sketch(p) {
  let canvasWidth = 700,
    canvasHeight = 500

  p.setup = () => {
    p.createCanvas(canvasWidth, canvasHeight)
  }

  p.draw = () => {
    p.background(200)
    p.rect(0.5 * canvasWidth, 0.5 * canvasWidth, 300, 50)
  }
}
