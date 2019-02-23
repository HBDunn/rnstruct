#!/bin/sh
#npx webpack-dev-server --config ./webpack.config.js  --hot --progress --colors --mode development
output=$(npx webpack-dev-server --config ./webpack.config.js  --hot --progress --colors --mode development)
echo "OUTPUT"
"${output}"
 
