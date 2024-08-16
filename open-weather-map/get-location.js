const API_KEY = process.env.OPEN_WEATHER_API_KEY
const BASE_URL = 'http://api.openweathermap.org/geo/1.0/'

async function getCityStateLocation(query) {
	const response = await fetch(`${BASE_URL}/direct?${query}&limit=1&appid=${API_KEY}`)
	if (response.status >= 500) return { data: undefined, error: true, message: `Error fetching city/state query data for ${query}` }
	else if (response.status >= 400) return { data: undefined, error: true, message: `Invalid city/state query ${query}` }
	else {
		let data = (await response.json())[0]
		if (!data) return { data: undefined, error: true, message: `Unable to find city/state for ${query}` }
		return { data, error: false }
	}
}

async function getZipLocation(query) {
	const response = await fetch(`${BASE_URL}/zip?${query}&limit=1&appid=${API_KEY}`)
	if (response.status >= 500) return { data: undefined, error: true, message: `Error fetching zip query data for ${query}` }
	else if (response.status >= 400) return { data: undefined, error: true, message: `Invalid zip query for ${query}` }
	else {
		let data = (await response.json())
		// This returns an empty array when the zip is not found but an object when it is found :(
		if (!data || (Array.isArray(data) && data.length < 1)) return { data: undefined, error: true, message: `Unable to find zip for ${query}` }
		return { data, error: false }
	}
}

async function getLatLongLocation(query) {
	const response = await fetch(`${BASE_URL}/reverse?${query}&limit=1&appid=${API_KEY}`)
	if (response.status >= 500) return { data: undefined, error: true, message: `Error fetching lat/long query data for ${query}` }
	else if (response.status >= 400) return { data: undefined, error: true, message: `Invalid lat/long query ${query}` }
	else {
		let data = (await response.json())[0]
		if (!data) return { data: undefined, error: true, message: `Unable to find lat/long ${query}` }
		return { data, error: false }
	}
}

module.exports = {
	getCityStateLocation,
	getZipLocation,
	getLatLongLocation
}
