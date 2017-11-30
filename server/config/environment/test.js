'use strict';

// Test specific configuration
// ===========================
module.exports = {
  // MongoDB connection options
  mongo: {
    // uri: 'mongodb://localhost/bloggingapplication-test'
    uri: 'mongodb://prajwal:prajwal28@ds125183.mlab.com:25183/yomanprojectfolder-dev'
  },
  sequelize: {
    uri: 'sqlite://',
    options: {
      logging: false,
      storage: 'test.sqlite',
      define: {
        timestamps: false
      }
    }
  }
};
