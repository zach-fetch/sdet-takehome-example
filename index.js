require('dotenv').config()
const { program } = require('commander')
const handleLocationRequest = require('./handler')

program.requiredOption('--locations <locations...>', 'single location for which lat long will be fetched')
program.parse()

const options = program.opts()
const locationInput = options.locations

locationInput.forEach(location => {
	handleLocationRequest(location).then(response => console.log(response))
})