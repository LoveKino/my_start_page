/**
 * window manager
 */

// [0, 0] -> [gridX - 1, gridY - 1]
const windowManager = (gridX, gridY) => {
  const getWindowPosition = (x, y) => {
    return {
      leftP: x / gridX,
      top: y / gridY,
      width: 1 / gridX,
      height: 1 / gridY
    };
  };

  const createWindow = (x, y, name) => {
  };
};

module.exports = {
  windowManager
};
