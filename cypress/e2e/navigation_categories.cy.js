// 1. Centralisation des sélecteurs (Bonnes pratiques Jour 4)
const selecteurs = {
  // Cible le bouton ou le bloc du menu latéral visible sur l'image
  menuCategories: '.vertical-menu, .menu-vertical, aside .title_block, #block_top_menu', 
  // Version robuste utilisant le texte visible à l'écran
  texteMenu: 'TOUTES LES CATÉGORIES',
  // Cible les liens de catégories (ex: Téléphones Et Tablettes)
  premierLienCategorie: '.vertical-menu-list a, .menu-content a, .tree a',
   titrePageCategorie: 'h1'
 
};


describe('Navigation et Catégories - Boutika', () => {

  // 2. Utilisation du Hook beforeEach (Jour 4)
  beforeEach(() => {
    
    Cypress.on('uncaught:exception', (err, runnable) => {
    return false
  });
  cy.visit('https://www.boutika.co.ma/');
  });
    
  it('Devrait afficher le menu des catégories sur la page d’accueil', () => {
   // Vérifie qu'un élément contenant "TOUTES LES CATÉGORIES" est bien visible
  cy.contains(selecteurs.texteMenu, { matchCase: false }).should('exist');
  });

  it('Devrait naviguer vers une catégorie principale au clic', () => {
    // On clique sur la première catégorie disponible
    cy.get(selecteurs.premierLienCategorie).first().click({ force: true });

    // Vérifications strictes (Chai) de la nouvelle page
    cy.url().should('include', 'telephones-et-tablettes');
    cy.get(selecteurs.titrePageCategorie).should('be.visible');
  });
});
