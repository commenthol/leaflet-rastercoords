/*
 * @copyright 2015 commenthol
 * @license MIT
 */
/* globals L */

function init () { // eslint-disable-line no-unused-vars
  var img = [
    3831, // original width of image
    3101 // original height of image
  ]
  // create the map
  var map = L.map('map', {minZoom: 0})

  // assign map and image dimensions
  var rc = new L.RasterCoords(map, img)
  // set max zoom Level (might be `x` if gdal2tiles was called with `-z 0-x` option)
  map.setMaxZoom(rc.zoomLevel())
  // set the view in the middle of the image
  map.setView(rc.unproject([img[0] / 2, img[1] / 2]), 2)

  // set marker at the image bound edges
  var layerBounds = L.layerGroup([
    L.marker(rc.unproject([0, 0])).bindPopup('[0,0]'),
    L.marker(rc.unproject(img)).bindPopup(JSON.stringify(img))
  ])
  map.addLayer(layerBounds)

  // set markers on click events in the map
  map.on('click', function (event) {
    var coords = rc.project(event.latlng)
    var marker = L.marker(rc.unproject(coords))
      .addTo(layerBounds)
    marker.bindPopup('[' + Math.floor(coords.x) + ',' + Math.floor(coords.y) + ']')
      .openPopup()
  })

  // add layer control object
  L.control.layers({}, {
    'Bounds': layerBounds
  }).addTo(map)

  // the tile layer containing the image generated with gdal2tiles --leaflet ...
  L.tileLayer('./tiles/{z}/{x}/{y}.png', {
    noWrap: true,
    attribution: 'Map <a href="https://commons.wikimedia.org/wiki/' +
      'File:Karta_%C3%B6ver_Europa,_1672_-_Skoklosters_slott_-_95177.tif">' +
      'Karta över Europa, 1672 - Skoklosters</a> under ' +
      '<a href="https://creativecommons.org/publicdomain/zero/1.0/deed.en">CC0</a>'
  }).addTo(map)
}
