describe('Subida y visualización de fotos en proyectos', () => {
  it('Admin puede subir y ver fotos', () => {
    cy.visit('/login');
    cy.get('input[placeholder="Email"]').type('admin@santander.com');
    cy.get('input[placeholder="Contraseña"]').type('admin123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/projects');
    cy.contains('Usuario: admin');

    cy.contains('Nuevo Proyecto').click();
    cy.get('input[placeholder="Cliente"]').type('Cliente Fotos');
    cy.get('input[placeholder="Dirección"]').type('Calle Fotos');
    cy.get('select').first().select('Vinyl');
    cy.get('input[placeholder="Área (m2)"]').type('100');
    cy.get('input[placeholder="Precio"]').type('5000');
    cy.get('select').eq(1).select('pending');
    cy.get('input[type="date"]').type('2026-01-10');
    cy.get('textarea').type('Notas Fotos');
    cy.get('button[type="submit"]').click();
    cy.contains('Proyecto creado correctamente');
    cy.url().should('include', '/projects/');

    cy.get('input[type="file"]').selectFile('cypress/fixtures/test-image.jpg');
    cy.get('button[type="submit"]').contains('Subir foto').click();
    cy.contains('Foto subida correctamente');
    cy.get('img').should('have.length.greaterThan', 0);
  });
});
