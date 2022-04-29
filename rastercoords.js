/**
 * leaflet plugin for plain image map projection
 * @copyright 2016- commenthol
 * @license MIT
 */
/* globals define */
/* eslint no-var:off */

;(function (factory) {
  var L
  if (typeof define === 'function' && define.amd) {
    // AMD
    define(['leaflet'], factory)
  } else if (typeof module !== 'undefined') {
    // Node/CommonJS
    L = require('leaflet')
    module.exports = factory(L)
  } else {
    // Browser globals
    if (typeof window.L === 'undefined') {
      throw new Error('Leaflet must be loaded first')
    }
    factory(window.L)
  }
}(function (L) {
  /**
   * L.RasterCoords
   * @param {L.map} map - the map used
   * @param {Array} imgsize - [ width, height ] image dimensions
   * @param {Number} [tilesize] - tilesize in pixels. Default=256
   * @param {Boolean} setmaxbounds - automatically set map max bounds. Default=true
   */
  L.RasterCoords = function (map, imgsize, tilesize, setmaxbounds = true) {
    this.map = map
    this.width = imgsize[0]
    this.height = imgsize[1]
    this.tilesize = tilesize || 256
    this.zoom = this.zoomLevel()
    if (setmaxbounds && this.width && this.height) {
      this.setMaxBounds()
    }
  }

  L.RasterCoords.prototype = {
    /**
     * calculate accurate zoom level for the given image size
     */
    zoomLevel: function () {
      return Math.ceil(
        Math.log(
          Math.max(this.width, this.height) /
          this.tilesize
        ) / Math.log(2)
      )
    },
    /**
     * unproject `coords` to the raster coordinates used by the raster image projection
     * @param {Array} coords - [ x, y ]
     * @return {L.LatLng} - internal coordinates
     */
    unproject: function (coords) {
      return this.map.unproject(coords, this.zoom)
    },
    /**
     * project `coords` back to image coordinates
     * @param {Array} coords - [ x, y ]
     * @return {L.LatLng} - image coordinates
     */
    project: function (coords) {
      return this.map.project(coords, this.zoom)
    },
    /**
     * get the max bounds of the image
     */
    getMaxBounds: function () {
      var southWest = this.unproject([0, this.height])
      var northEast = this.unproject([this.width, 0])
      return new L.LatLngBounds(southWest, northEast)
    },
    /**
     * sets the max bounds on map
     */
    setMaxBounds: function () {
      var bounds = this.getMaxBounds()
      this.map.setMaxBounds(bounds)
    }
  }

  return L.RasterCoords
}))
; // eslint-disable-line semi
