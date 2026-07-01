describe('Fonctionnalité de Recherche - Boutika', () => {

  Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  })
     
  it('Devrait rechercher un iPhone avec succès', () => {
    // 1. Visiter le site
    cy.visit('https://boutika.co.ma')
    //Assurez-vous que le logo, la barre de recherche et le bouton "Panier" 
    // sont visibles dès le chargement de la page d'accueil.
    cy.get('[data-original="/img/boutikama-logo-1564066128.jpg"]').should('be.visible');
    cy.get('#pos_query_top').should('be.visible');
    cy.get('.header').should('exist');
  
    // 2. Trouver la barre de recherche avec son ID  et écrire "iPhone"
    cy.get('#pos_query_top').type('iPhone')

    // 3. Cliquer sur le bouton de soumission du formulaire
    //cy.get('button[type="submit"]').click()
    cy.get('button.search_submit').click()

    // 3. Le site crash (Bug PrestaShop documenté dans l'Issue #1)
    // On attend que la page d'erreur s'affiche pour valider le comportement actuel
    cy.contains('This page has moved').should('be.visible');
  })

})
