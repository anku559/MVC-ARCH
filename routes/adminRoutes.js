const BusinessController = require('../controllers/admin/BusinessController');

module.exports = (app) => {
  app.post('/add-business', BusinessController.addBusiness);
};
