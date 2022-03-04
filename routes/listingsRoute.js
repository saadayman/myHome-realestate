const express = require('express')
const { protect } = require('../config/auth')
const router= express.Router()
const { createListing, getListings, updateListing,deleteListing,getListingDetails } = require('../controllers/listingsController')

router.post('/addlisting',protect,createListing)
router.get('/',getListings)
router.get('/:id',protect,getListingDetails)
router.put('/',protect,updateListing)
router.delete('/',protect,deleteListing)
module.exports = router