const formatResponse = require("./open-weather-map/format-response")
const { getZipLocation, getCityStateLocation, getLatLongLocation } = require("./open-weather-map/get-location")
const { getLocationType, locationTypes } = require("./open-weather-map/location-validator")

async function handleLocationRequest(locationString) {
	// Validate location is valid
	const location = getLocationType(locationString)
	let res

	switch (location.type) {
		case locationTypes.zip:
			res = await getZipLocation(location.query)
			break
		case locationTypes.cityState:
			res = await getCityStateLocation(location.query)
			break
		case locationTypes.latLong:
			res = await getLatLongLocation(location.query)
			break
		default:
			res = {
				error: true, message: `Location ${locationString} is not a valid city/state, zip, or lat/long`
			}
			break
	}

	// Return formatted location info
	return formatResponse(res)
}

module.exports = handleLocationRequest