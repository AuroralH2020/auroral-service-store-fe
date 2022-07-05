const environments = {
  master: {
    prod: {
      production: true,
      apiUrl: '/api',
    },
    staging: {
      production: false,
      apiUrl: '/api',
    }
  },
  develop: {
    prod: {
      production: true,
      apiUrl: '/api',
    },
    staging: {
      production: false,
      apiUrl: '/api',
    }
  }
};

module.exports = environments;
