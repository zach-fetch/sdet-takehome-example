## Install

1. `yarn install`
2. Copy the `.env.example` file and rename to `.env`. Add the open weather map API KEY to that file.

## Run Utility

`node index.js --locations "Madison, WI"` OR `yarn utility --locations "Madison, WI"`

Enter as many locations as you would like. They should be separated by spaces. Any locations with spaces in them (like lat/longs or city/states) should have quotes around them.

## Testing

`npx jest`