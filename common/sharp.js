/**
 * sharp設定
 */

const sharp = require("sharp");

/**  */
sharp(input)
  .resize(200, 200, {
    fit: sharp.fit.outside,
    withoutReduction: true
  })
  .toFormat('jpeg')
  .toBuffer()
  .then((outputBuffer) => {
    // outputBuffer contains JPEG image data
    // of at least 200 pixels wide and 200 pixels high while maintaining aspect ratio
    // and no smaller than the input image
  });