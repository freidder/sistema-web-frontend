describe('Gestión de roles y permisos', () => {
  it('Empleado no puede crear ni editar proyectos', () => {
    cy.visit('/register');
    cy.get('input[placeholder="Nombre"]').type('Empleado E2E');
    cy.get('input[placeholder="Email"]').type('empleadoe2e@example.com');
    cy.get('input[placeholder="Contraseña"]').type('Test123!');
    cy.get('select').select('employee');
    cy.get('button[type="submit"]').click();
    cy.contains('Usuario registrado correctamente');

    cy.visit('/login');
    cy.get('input[placeholder="Email"]').type('empleadoe2e@example.com');
    cy.get('input[placeholder="Contraseña"]').type('Test123!');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/projects');
    cy.contains('Usuario: employee');

    cy.contains('Nuevo Proyecto').should('not.exist');
    cy.get('table tbody tr').first().within(() => {
      cy.contains('Editar').should('not.exist');
    });
  });

  it('Supervisor puede crear y editar proyectos', () => {
    cy.visit('/register');
    cy.get('input[placeholder="Nombre"]').type('Supervisor E2E');
    cy.get('input[placeholder="Email"]').type('supervisore2e@example.com');
    cy.get('input[placeholder="Contraseña"]').type('Test123!');
    cy.get('select').select('supervisor');
    cy.get('button[type="submit"]').click();
    cy.contains('Usuario registrado correctamente');

    cy.visit('/login');
    cy.get('input[placeholder="Email"]').type('supervisore2e@example.com');
    cy.get('input[placeholder="Contraseña"]').type('Test123!');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/projects');
    cy.contains('Usuario: supervisor');

    cy.contains('Nuevo Proyecto').should('exist');
    cy.contains('Nuevo Proyecto').click();
    cy.get('input[placeholder="Cliente"]').type('Cliente Supervisor');
    cy.get('input[placeholder="Dirección"]').type('Calle Supervisor');
    cy.get('select').first().select('Wood');
    cy.get('input[placeholder="Área (m2)"]').type('200');
    cy.get('input[placeholder="Precio"]').type('12000');
    cy.get('select').eq(1).select('pending');
    cy.get('input[type="date"]').type('2026-01-10');
    cy.get('textarea').type('Notas Supervisor');
    cy.get('button[type="submit"]').click();
    cy.contains('Proyecto creado correctamente');
    cy.url().should('include', '/projects/');
    cy.contains('Editar').should('exist');
  });
});
