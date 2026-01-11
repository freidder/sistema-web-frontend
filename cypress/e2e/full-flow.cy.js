describe('Flujo completo Santander Construction', () => {
  it('Registro, login, CRUD y roles', () => {
    cy.visit('/register');
    cy.get('input[placeholder="Nombre"]').type('E2E User');
    cy.get('input[placeholder="Email"]').type('e2euser@example.com');
    cy.get('input[placeholder="Contraseña"]').type('Test123!');
    cy.get('select').select('admin');
    cy.get('button[type="submit"]').click();
    cy.contains('Usuario registrado correctamente');

    cy.visit('/login');
    cy.get('input[placeholder="Email"]').type('e2euser@example.com');
    cy.get('input[placeholder="Contraseña"]').type('Test123!');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/projects');
    cy.contains('Usuario: admin');

    cy.contains('Nuevo Proyecto').click();
    cy.get('input[placeholder="Cliente"]').type('Cliente E2E');
    cy.get('input[placeholder="Dirección"]').type('Calle E2E');
    cy.get('select').first().select('Vinyl');
    cy.get('input[placeholder="Área (m2)"]').type('150');
    cy.get('input[placeholder="Precio"]').type('8000');
    cy.get('select').eq(1).select('in_progress');
    cy.get('input[type="date"]').type('2026-01-10');
    cy.get('textarea').type('Notas E2E');
    cy.get('button[type="submit"]').click();
    cy.contains('Proyecto creado correctamente');

    cy.url().should('include', '/projects/');
    cy.contains('Cliente: Cliente E2E');
    cy.contains('Notas: Notas E2E');
    cy.contains('Editar').click();
    cy.get('textarea').clear().type('Notas editadas');
    cy.get('button[type="submit"]').click();
    cy.contains('Proyecto actualizado');
    cy.url().should('include', '/projects/');
    cy.contains('Notas: Notas editadas');

    cy.visit('/dashboard');
    cy.contains('Dashboard');
    cy.contains('Total proyectos:');
  });
});
