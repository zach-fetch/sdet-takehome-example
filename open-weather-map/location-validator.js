const { isPostalCode, isLatLong, isAlpha } = require('validator')

const locationTypes = {
	zip: 'ZipCode',
	cityState: 'CityState',
	latLong: 'LatLong',
	unsupported: 'Unsupported'
}

function getLocationType(l) {
	if (typeof l === 'string') {
		const location = l.trim()

		// Check Postal Code
		if (isPostalCode(location, 'US')) return { type: locationTypes.zip, query: `zip=${location},US` }

		// Check Lat Long
		if (isLatLong(location)) {
			const [lat, lon] = location.split(',').map(s => s.trim())
			return { type: locationTypes.latLong, query: `lat=${lat}&lon=${lon}` }
		}

		// Check City State
		const [city, state] = location.split(',').map(s => s.trim())
		if (isAlpha(city.replace(' ', '')) && state && isAlpha(state)) return { type: locationTypes.cityState, query: `q=${city},${state},US` }
	}
	return { type: locationTypes.unsupported }
}

module.exports = {
	locationTypes,
	getLocationType
}