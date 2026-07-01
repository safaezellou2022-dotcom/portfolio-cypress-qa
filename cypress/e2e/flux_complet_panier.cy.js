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
    cy.visit('/', { timeout: 10000 });
  });

  it('Scénario : Navigation vers une catégorie, sélection et ajout d’un produit au panier', () => {
    
    // --- ÉTAPE 1 : Navigation via les catégories ---
    cy.log('Étape 1 : Accès à la catégorie Téléphones Et Tablettes');
    cy.contains('Téléphones & Tablettes', { timeout: 6000 }).click();

    // --- ÉTAPE 2 : Sélection du premier produit disponible ---
    cy.log('Étape 2 : Sélection et clic sur le premier article de la liste');
    
    // On cherche les images qui ont des classes liées aux vignettes de produits ou situées dans la zone principale
   cy.get('.product-list img, .products img, img[class*="product"], .product-image img, .grid img')
  .first()
  .click({ force: true });
           // --- ÉTAPE 3 : Configuration et Ajout au Panier ---
    cy.log('Étape 3 : Clic sur le bouton d’ajout au panier');
    
    // 1. On s'assure que le bouton est stable, visible et cliquable sans forcer
    cy.get('.add-to-cart, #add_to_cart button, button[data-button-action="add-to-cart"]')
      .first()
      .should('be.visible')
      .and('not.be.disabled');

    // 2. On déclenche des événements réalistes (trigger) avant de cliquer normalement
    cy.get('.add-to-cart, #add_to_cart button, button[data-button-action="add-to-cart"]')
      .first()
      .trigger('mouseover')
      .click(); 

        // --- ÉTAPE 4 : Vérification finale du panier ---
    cy.log('Étape 4 : Validation du message de succès d’ajout au panier');
    
    // On vérifie que la bannière verte de succès s'affiche bien à l'écran
    cy.contains('Produit ajouté au panier avec succès', { timeout: 8000 })
      .should('be.visible');

    // On valide que le bouton "COMMANDER" est disponible dans le pop-up
    // On ajoute l'option matchCase: false pour accepter "COMMANDER" ou "Commander"
cy.contains('COMMANDER', { matchCase: false }).should('be.visible');
});
})