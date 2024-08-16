function formatResponse(response) {
	if (response.error) return response.message
	return `${response.data.name}${response.data.state ? `, ${response.data.state}` : ''}: ${response.data.lat}, ${response.data.lon}`
}

module.exports = formatResponse