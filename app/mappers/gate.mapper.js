export default ({ id, x, y, constants: { WIDTH, HEIGHT }, type, category }) => {
  return {
    id,
    position: { x, y },
    dimensions: { height: HEIGHT, width: WIDTH },
    type,
    category
  };
}