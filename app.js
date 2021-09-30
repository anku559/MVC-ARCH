const path = require('path');
const express = require('express');
const app = express();
const dotenv = require('dotenv');

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// PUBLIC PATH
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));

// ENVIRONMENT VARIABLES
const IN_DEVELOPMENT = true;
const DEV_PATH = path.join(__dirname, '/config/environments/dev.env');
const PROD_PATH = path.join(__dirname, '/config/environments/prod.env');

if (IN_DEVELOPMENT) {
  dotenv.config({ path: DEV_PATH });
} else {
  dotenv.config({ path: PROD_PATH });
}

// ADMIN
const adminRoutes = express.Router();
app.use('/admin', adminRoutes);
require('./routes/adminRoutes')(adminRoutes);

// INVALID ENDPOINTS
app.get('*', (req, res) => {
  res.status(404).json({
    code: 404,
    info: 'Not Found.',
    status: true,
    message: 'The resource you looking for needs an valid end point.',
  });
});

// PORT listening from ENVIRONMENT VARIABLES
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`PORT listening on: ${PORT}`);
});
