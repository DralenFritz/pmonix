// middleware for a route that does not exist
const notFound = (req, res) => res.status(404).send('Route does not exist')

module.exports = notFound
