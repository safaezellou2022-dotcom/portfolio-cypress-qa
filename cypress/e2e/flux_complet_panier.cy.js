/**
 * @file flux_complet_panier.cy.js
 * @description Test de bout en bout (E2E) simulant le parcours utilisateur complet :
 * Navigation dans les catégories, sélection d'un produit et ajout au panier.
 * @project Projet Portfolio 1 - Automatisation Cypress sur Boutika
 */

describe('Flux Complet Utilisateur (E2E)', () => {

  beforeEach(() => {
    // Configuration globale : Ignorer les exceptions non gérées par le site distant
    Cypress.on('uncaught:exception', (err, runnable) => {
      return false;
    });

    // Initialisation : Visite de la page d'accueil avec un timeout de sécurité
    cy.visit('https://boutika.co.ma', { timeout: 10000 });
  });

  it('Scénario : Navigation vers une catégorie, sélection et ajout d’un produit au panier', () => {
    
     // --- ÉTAPE 1 : Navigation via les catégories ---
    cy.log('Étape 1 : Accès à la catégorie Téléphones Et Tablettes');
    cy.contains('Téléphones & Tablettes', { timeout: 6000 }).click();
    
    // Validation corrigée de l'URL (Sans erreur de syntaxe)
    cy.url({ timeout: 7000 }).should('include', '240-telephones-et-tablettes');

       // --- ÉTAPE 2 : Sélection du premier produit disponible ---
    cy.log('Étape 2 : Sélection et clic sur le premier article de la liste');
    
    // On cherche les images qui ont des classes liées aux vignettes de produits ou situées dans la zone principale
   cy.get('.product-list img, .products img, img[class*="product"], .product-image img, .grid img')
  .first()
  .click({ force: true });
       // --- ÉTAPE 3 : Configuration et Ajout au Panier ---
    cy.log('Étape 3 : Clic sur le bouton d’ajout au panier');
    
    // On ajoute .first() pour s'assurer de ne cliquer que sur le bouton d'achat principal
    cy.get('.add-to-cart, #add_to_cart button, button[data-button-action="add-to-cart"]')
      .first()
      .click({ force: true });

        // --- ÉTAPE 4 : Vérification finale du panier ---
    cy.log('Étape 4 : Validation de la redirection vers la page Panier');
    
    // On valide de manière robuste que l'utilisateur a bien atteint l'URL du panier
    cy.url({ timeout: 8000 }).should('include', '/panier');
    
    // On s'assure que le bloc principal du panier est bien affiché à l'écran
   cy.get('h1').contains('panier', { matchCase: false }).should('be.visible');

  });

});
