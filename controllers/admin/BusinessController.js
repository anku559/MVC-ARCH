const BusinessModel = require('../../models/admin/BusinessModel');

class BusinessController {
  static addBusiness(req, res) {
    BusinessModel.addBusiness();
  }
}

module.exports = BusinessController;
