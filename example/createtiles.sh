#!/bin/bash

# do NOT forget to install `python-gdal` library
# assuming you are on a debian like OS
#sudo apt install python-gdal

# get the tool
test ! -f gdal2tiles.py \
  && curl https://raw.githubusercontent.com/commenthol/gdal2tiles-leaflet/master/gdal2tiles.py \
  > gdal2tiles.py \
  && echo "'python-gdal' library required - please install"

# process ...
export GDAL_ALLOW_LARGE_LIBJPEG_MEM_ALLOC=1
python ./gdal2tiles.py -l -p raster -z 0-4 -w none karta.jpg tiles

echo 'Now open "index.html" in your browser.'
