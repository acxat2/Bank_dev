/// <reference types="cypress" />

describe('Coin', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
    cy.viewport(1800, 1200);
    cy.get('.input-login').clear().type('developer');
    cy.get('.input-password').clear().type('skillbox');
    cy.contains('Войти').click();
  });

  it('Возможность авторизоваться, возможность просмотреть список счетов, возможность перевести сумму со счёта на счёт', () => {
    cy.get('.account-card:last-child .account-number-card').then(
      ($numberLastCard) => {
        cy.contains('Открыть').click();
        cy.get('#inputAccountTo').type($numberLastCard.text());
        cy.get('#inputAmount').clear().type(1000);
        cy.contains('Отправить')
          .click()
          .then(() => {
            cy.contains('Вернуться назад').click();
          });
      }
    );
  });
  it('Возможность создать новый счёт и перевести с него сумму.', () => {
    cy.contains('Создать новый счёт')
      .click()
      .then(() => {
        cy.get('.account-card:last-child .account-number-card').then(
          ($numberLastCard) => {
            cy.contains('Открыть').click();
            cy.get('#inputAccountTo').type($numberLastCard.text());
            cy.get('#inputAmount').clear().type(1000);
            cy.contains('Отправить').click();
            cy.contains('Вернуться назад').click();
            cy.get('.account-card:first-child .account-number-card').then(
              ($numberFirstCard) => {
                cy.get('.account-card:last-child button')
                  .click()
                  .then(() => {
                    cy.get('#inputAccountTo')
                      .clear()
                      .type($numberFirstCard.text());
                    cy.get('#inputAmount').type(500);
                    cy.contains('Отправить')
                      .click()
                      .then(() => {
                        cy.contains('Вернуться назад').click();
                      });
                  });
              }
            );
          }
        );
      });
  });
});
