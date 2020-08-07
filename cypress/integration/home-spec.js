const moment = require("moment")

// TODO - Add ability to set date
const expenses = [
    {
        name: "Test one",
        category: "Work",
        desc: "Test expense for work",
        amount: "250.00"
    },
    {
        name: "Test two",
        category: "Personal",
        desc: "Test personal expense",
        amount: "42"
    }
]

function enterExpenseData(args) {
    cy.get('#name-input').type(args.name)
    cy.get('#category-select').select(args.category).blur()
    cy.get('#description-input').type(args.desc)
    cy.get('#amount-input').type(args.amount).blur()
}

describe('Home Page', () => {
    it('successfully loads', () => {
        cy.visit('/')
    })
    
    it('contains navigation bar', () => {
        cy.get('#navigation')
    })

    it('contains chart', () => {
        cy.get('#chart')
    })
})

describe('Expenses Page', () => {
    it('successfully loads', () => {
        cy.visit('/#!/list')
    })

    it('contains navigation bar', () => {
        cy.get('#navigation')
    })

    it('contains table', () => {
        cy.get('#expense-list')
    })

    it('contains `new` button', () => {
        cy.get('#new-button')
    })

})

describe('Categories Page', () => {
    it('successfully loads, has navigation', () => {
        cy.visit('/#!/categories')
        cy.get('#navigation')
    })

    it('Table contains correct default categories', () => {
        cy.get(':nth-child(1) > td').contains("Personal")
        cy.get(':nth-child(2) > td').contains("Work")
        cy.get(':nth-child(3) > td').contains("Another category")
    })
})

describe('Settings Page', () => {
    it('successfully loads, has navigation', () => {
        cy.visit('/#!/settings')
        cy.get('#navigation')
    })

    it('contains placeholder image', () => {
        cy.get('#placeholder-photo')
    })
})

describe('Create new expense, shows in list', () => {
    const exp0 = expenses[0]

    it('Expense page loads', () => {
        cy.visit('/#!/list')
    })

    it('Create new expense and verify it is in the table', () => {

        // Create expense
        cy.get('#new-button').click()
        cy.location().should((loc) => {
            expect(loc.hash).to.contain('#!/edit/')
        })
        enterExpenseData(exp0)

        cy.get('#save-button').click()
        cy.location().should((loc) => {
            expect(loc.hash).to.eq('#!/list')
        })

        // Verify expense
        cy.get('tbody > :nth-child(1) > :nth-child(1)').contains(exp0.name)
        cy.get('tbody > :nth-child(1) > :nth-child(2)').contains(exp0.category)
        cy.get('tbody > :nth-child(1) > :nth-child(3)').contains(exp0.desc)
        cy.get('tbody > :nth-child(1) > :nth-child(4)').contains(exp0.amount)
        cy.get('tbody > :nth-child(1) > :nth-child(5)').contains(moment(Date()).format('YYYY/MM/DD'))
    })
})

describe('Create two expenses with different categories, chart displays both', () => {

    const exp0 = expenses[0]
    const exp1 = expenses[1]

    it('All of the things... to preserve local storage', () => {

        cy.visit('/#!/list')

        // Create expense 1
        cy.get('#new-button').click()
        cy.location().should((loc) => {
            expect(loc.hash).to.contain('#!/edit/')
        })

        enterExpenseData(exp0)
        cy.get('#save-button').click()
        cy.location().should((loc) => {
            expect(loc.hash).to.eq('#!/list')
        })


        // Create expense 2
        cy.get('#new-button').click()
        cy.location().should((loc) => {
            expect(loc.hash).to.contain('#!/edit/')
        })

        enterExpenseData(exp1)
        cy.get('#save-button').click()
        cy.location().should((loc) => {
            expect(loc.hash).to.eq('#!/list')
        })

        // Verify expense 1
        cy.get('tbody > :nth-child(1) > :nth-child(1)').contains(exp0.name)
        cy.get('tbody > :nth-child(1) > :nth-child(2)').contains(exp0.category)
        cy.get('tbody > :nth-child(1) > :nth-child(3)').contains(exp0.desc)
        cy.get('tbody > :nth-child(1) > :nth-child(4)').contains(exp0.amount)
        cy.get('tbody > :nth-child(1) > :nth-child(5)').contains(moment(Date()).format('YYYY/MM/DD'))

        // Verify expense 2
        cy.get('tbody > :nth-child(2) > :nth-child(1)').contains(exp1.name)
        cy.get('tbody > :nth-child(2) > :nth-child(2)').contains(exp1.category)
        cy.get('tbody > :nth-child(2) > :nth-child(3)').contains(exp1.desc)
        cy.get('tbody > :nth-child(2) > :nth-child(4)').contains(exp1.amount)
        cy.get('tbody > :nth-child(2) > :nth-child(5)').contains(moment(Date()).format('YYYY/MM/DD'))

        // TODO - ensure there aren't more than 2 sections
        // Go home and verify chart has 2 sections
        cy.visit('/')
        cy.get('.c3-target-0 > .c3-shapes > .c3-shape')
        cy.get('.c3-target-1 > .c3-shapes > .c3-shape')

    })
})
