describe('Fonctionnalité de Recherche - Boutika', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })
     
  it('Devrait rechercher un iPhone avec succès', () => {
    // 1. Visiter le site
    cy.visit('https://boutika.co.ma')

    // 2. Trouver la barre de recherche avec son ID réel et écrire "iPhone"
    cy.get('#pos_query_top').type('iPhone')

    // 3. Cliquer sur le bouton de soumission du formulaire
    //cy.get('button[type="submit"]').click()
    cy.get('button.search_submit').click()
  })

})
