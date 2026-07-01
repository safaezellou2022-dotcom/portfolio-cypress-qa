module.exports = {
  allowCypressEnv: false,

  e2e: {
     baseUrl: 'https://www.boutika.co.ma/', // 👈 L'URL est centralisée ici désormais
    setupNodeEvents(on, config) {
    // implement node event listeners here
    },
  },
};
