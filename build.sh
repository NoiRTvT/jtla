rm -rf ./dist
tsc --project ./tsconfig.json --noEmit
babel src --out-dir dist --extensions .ts --copy-files --ignore "src/**/*.test.ts","src/**/*.types.ts","src/types.ts"
find ./dist -name "*.test.ts" -type f -delete
find ./dist -name "*.types.ts" -type f -exec rename ".types.ts" ".d.ts" '{}' \;
cp package.json ./dist/package.json
