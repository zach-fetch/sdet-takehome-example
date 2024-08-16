const { exec } = require('child_process')
describe('Command Line Interface Tests', () => {
	it.each([
		[['Chicago, IL'], ['Chicago, Illinois: 41.8755616, -87.6244212']],
		[['Madison, WI', 'Chicago, IL'], ['Madison, Wisconsin: 43.074761, -89.3837613', 'Chicago, Illinois: 41.8755616, -87.6244212']],
		[['12345'], ['Schenectady: 42.8142, -73.9396']],
		[['53704', '12345'], ['Madison: 43.1205, -89.3523', 'Schenectady: 42.8142, -73.9396']],
		[['33.5206824, -86.8024326'], ['Birmingham, Alabama: 33.5206824, -86.8024326']],
		[['33.5206824, -86.8024326', '43.1205, -89.3523'], ['Birmingham, Alabama: 33.5206824, -86.8024326', 'Madison, Wisconsin: 43.074761, -89.3837613']],
		[['53704', '33.5206824, -86.8024326', 'Chicago, IL'], ['Madison: 43.1205, -89.3523', 'Birmingham, Alabama: 33.5206824, -86.8024326', 'Chicago, Illinois: 41.8755616, -87.6244212']]
	])('should handle valid results', async (locations, expectedResults) => {
		const result = await new Promise((resolve, reject) => {
			exec(`node index.js --locations ${locations.map(l => `"${l}"`).join(' ')}`, (error, stdout, stderr) => {
				if (error) reject(error)
				resolve(stdout ? stdout : stderr)
			})
		})
		expectedResults.forEach(expected => expect(result).toContain(expected))
	})

	it.each([
		[['00001'], ['Invalid zip query for zip=00001,US']],
		[['nada city'], ['Location nada city is not a valid city/state, zip, or lat/long']],
		[['12, 45'], ['Unable to find lat/long lat=12&lon=45']],
		[[], ["error: option '--locations <locations...>' argument missing"]],
	])('should handle invalid results', async (locations, expectedResults) => {
		const result = await new Promise((resolve) => {
			exec(`node index.js --locations ${locations.map(l => `"${l}"`).join(' ')}`, (error, stdout, stderr) => {
				if (error) resolve(error.message)
				resolve(stdout ? stdout : stderr)
			})
		})
		expectedResults.forEach(expected => expect(result).toContain(expected))
	})
})
