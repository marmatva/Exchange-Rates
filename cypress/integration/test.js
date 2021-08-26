/// <reference types="Cypress" /> 

const URL = "http://127.0.0.1:8080";
let todayFormat;

describe('Test Form Validation', ()=>{
    it('Submits form with no date', ()=>{
        cy.visit(URL);
        cy.get('#exchange-form').find('#submit').click();
        cy.get('#date').should('have.class', 'invalid')
            .parent().children('p').should('have.text', 'Please select a valid date');
    });
    let today = new Date();
    let todayDate = today.getDate();
    let todayMonth = today.getMonth()+1;
    let todayYear = today.getFullYear();
    todayMonth = ((todayMonth.toString()).length<2) ? ("0"+todayMonth.toString()) : todayMonth;
    todayDate = ((todayDate.toString()).length<2) ? ("0"+todayDate.toString()) : todayDate;
    todayFormat = `${todayYear}-${todayMonth}-${todayDate}`

    it('Enters tomorrows date', ()=>{
        let tomorrowDate = todayDate+1;
        tomorrowDate = ((tomorrowDate.toString()).length<2) ? ("0"+tomorrowDate.toString()) : tomorrowDate;
        let tomorrowFormat = `${todayYear}-${todayMonth}-${tomorrowDate}`
        let todayFormatMessage = `${todayDate}/${todayMonth}/${todayYear}`

        cy.get('#date').type(tomorrowFormat).blur();
        cy.get('#date').should('not.have.class', 'invalid')
            .parent().children('p').should('not.exist');

        cy.get('#exchange-form').find('#submit').click();

        cy.get('#date').invoke('prop', 'validationMessage')
            .should('equal', `El valor debe ser igual o anterior a ${todayFormatMessage}.`);

    })
    it('Enters valid date', ()=>{
        cy.get('#date').type(todayFormat);

        cy.get('#submit').click();

        cy.get('fieldset').should('not.exist');
        cy.get('.loading-container').should('have.text', "Loading Results...");
        cy.get('.loading-container').find('.loader').should('be.visible');

        cy.get('.loading-container').should('not.exist');
        cy.get('.currencies-grid').should('be.visible');

    })
})

describe('Test the main functionality', ()=>{
    
    it('Enters valid date and request EUR rates', ()=>{
        cy.reload();
        cy.get('#date').type(todayFormat);
        cy.get('#submit').click();

        cy.get('.currencies-grid').should('exist');
        cy.get('.card').should('have.length.above', 150);
        cy.get('.card').should('contain', '€ 1  =');
    })

    it('Enters valid date and request USD rates', ()=>{
        cy.reload();
        cy.get('#date').type(todayFormat);
        cy.get('.base-label').click();
        cy.get('#submit').click();

        cy.get('.currencies-grid').should('exist');
        cy.get('.card').should('have.length.above', 150);
        cy.get('.card').should('contain', '$ 1  =');
    })
})

