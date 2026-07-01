describe('Vérification des accès plateformes', () => {

  // Ligne magique pour ignorer les erreurs JavaScript du site web
  Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })
     
  it('Devrait ouvrir la page de test boutika avec succès', () => {
    cy.visit('https://www.boutika.co.ma/')
  })

})