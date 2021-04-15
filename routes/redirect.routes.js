const { Router } = require('express')
const router = Router()
const Link = require('../models/Link')

router.get('/:code', async (req, res) => {
  console.log('work')
  try {
    const link = await Link.findOne({ code: req.params.code })
    console.log(link)

    if (link) {
      link.clicks++
      await link.save()
      return res.redirect(link.from)
    }

    res.status(404).json({ message: 'Link not found' })
  } catch (e) {
    res.status(500).json({ message: 'Some error, try again' })
  }
})

module.exports = router
