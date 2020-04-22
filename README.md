# leaflet-rastercoords

> Leaflet plugin for plain image map projection to display large images using tiles generated with gdal2tiles-leaflet

[![NPM version](https://badge.fury.io/js/leaflet-rastercoords.svg)](https://www.npmjs.com/package/leaflet-rastercoords)

See the plugin in action on <https://commenthol.github.io/leaflet-rastercoords/>.

## Usage

Process your "large" image with [gdal2tiles-leaflet][]

```js
// for use with browserify / webpack
var L = require('leaflet')
L.RasterCoords = require('leaflet-rastercoords')

var img = [
  3831,  // original width of image (here from `example/karta.jpg`)
  3101   // original height of image
]
// create the map
var map = L.map('map')

// assign map and image dimensions
var rc = new L.RasterCoords(map, img)
// set max zoom Level (might be `x` if gdal2tiles was called with `-z 0-x` option)
map.setMaxZoom(rc.zoomLevel())
// all coordinates need to be unprojected using the `unproject` method
// set the view in the lower right edge of the image
map.setView(rc.unproject([img[0], img[1]]), 2)

// set markers on click events in the map
map.on('click', function (event) {
  // any position in leaflet needs to be projected to obtain the image coordinates
  var coords = rc.project(event.latlng)
  var marker = L.marker(rc.unproject(coords))
    .addTo(map)
  marker.bindPopup('[' + Math.floor(coords.x) + ',' + Math.floor(coords.y) + ']')
    .openPopup()
})

// the tile layer containing the image generated with `gdal2tiles --leaflet -p raster -w none <img> tiles`
L.tileLayer('./tiles/{z}/{x}/{y}.png', {
  noWrap: true
}).addTo(map)
```

## Example

The tiles in the example were generated using [gdal2tiles-leaflet][].
Take a look at [example/createtiles.sh](./example/createtiles.sh).

## License

Copyright (c) 2016- commenthol (MIT License)  
See [LICENSE][] for more info.

## References

<!-- !ref -->

* [example][example]
* [gdal2tiles-leaflet][gdal2tiles-leaflet]
* [LICENSE][LICENSE]

<!-- ref! -->

[LICENSE]: ./LICENSE
[gdal2tiles-leaflet]: https://github.com/commenthol/gdal2tiles-leaflet
[example]: https://commenthol.github.io/gdal2tiles-leaflet/test/index.html
