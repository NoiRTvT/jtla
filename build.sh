rm -rf ./dist
rm -rf ./publish
tsc --project ./tsconfig.json
tsc --project ./tsconfig.json --outFile ./dist/jtla.js
tsc-alias -p tsconfig.json
mkdir publish
cp -R ./dist ./publish
cp -f ./package.json ./publish/package.json
cp -f ./README.md ./publish/README.md
