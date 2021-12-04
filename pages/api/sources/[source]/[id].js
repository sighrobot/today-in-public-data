export default async (req, res) => {
  res.json({ source: req.query.source, id: req.query.id })
}
