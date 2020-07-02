// magic eye render for p5js class
// by Oran C
// oranbusiness@gmail.com
// github.com/wisehackermonkey
// 20190516

'use strict';
class Magic {
  constructor(_width, _height) {
    this.canvas
    this.context
    this.magicEye
    this.magic_image_id = "magic-eye"

    this.init_canvas("defaultCanvas0")

    this.magicEye = this.Magic_Eye_canvas(this.magic_image_id)
    this.create_img(this.magic_image_id, _width, _height)
  }

  // copy the pixels from the p5 canvas and create 
  // a depthmap of the canvas
  getDepthMap() {
    var depthMap, pixelData, width, height, row, offset
    depthMap = []
    width = this.canvas.width
    height = this.canvas.height
    pixelData = this.context.getImageData(0, 0, width, height).data
    for (let y = 0; y < height; y++) {
      row = []
      offset = width * y * 4
      for (let x = 0; x < width; x++) {
        // assume grayscale (R, G, and B are equal)
        row.push(pixelData[offset + (x * 4)])
      }
      depthMap.push(row)
    }
    return depthMap
  }


  redraw_magic_eye() {
    this.magicEye.depthMap = this.getDepthMap(this.canvas)
    this.magicEye.render()
  }
  init_canvas(element_id) {
    this.canvas = document.getElementById(element_id)
    this.context = this.canvas.getContext("2d")
  }

  Magic_Eye_canvas(element_id) {
    return new MagicEye({
      el: element_id,
      adaptToElementSize: true
    })
  }
  create_img(id_name, _width, _height) {
    let img = createElement("img")
    img.attribute('width', _width.toString());
    img.attribute('height', _height.toString());

    img.attribute('id', id_name);
    return img
  }
}