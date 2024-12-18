const express = require('express');
const router = express.Router();

// Import the necessary category functions from the controller
const {
  showAllCategories,
  createCategory,
  categoryPageDetails,
} = require('../controller/Category');

// Define the routes for categories
router.post('/createCategory', createCategory); // POST to create a new category
router.get('/showAllCategories', showAllCategories); // GET to show all categories
router.post('/getCategoryPageDetails', categoryPageDetails); // POST to get details of a category page

module.exports = router;
