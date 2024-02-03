Cypress.Commands.add('login', (
  user = Cypress.env('user_name'),
  password = Cypress.env('user_password'),
  { cacheSession = true } = {},
) => {
  const login = function() {
    cy.visit('/users/sign_in')

    cy.get("[data-qa-selector='login_field']").type(user)
    cy.get("[data-qa-selector='password_field']").type(password, { log: false })
    cy.get("[data-qa-selector='sign_in_button']").click()
  }

  const validate = function() {
    cy.visit('/')
    cy.location('pathname', { timeout: 1000 })
      .should('not.eq', '/users/sign_in')
  }

  const options = {
    cacheAcrossSpecs: true,
    validate,
  }

  if (cacheSession) {
    cy.session(user, login, options)
  } else {
    login()
  }
})

  
  Cypress.Commands.add('logout', function() {
    cy.get('.qa-user-avatar').click()
    cy.contains('Sign out').click()
  })

  Cypress.Commands.add('gui_createProject', function(project) {
    cy.visit('/projects/new')
  
    cy.get('#project_name').type(project.name)
    cy.get('#project_description').type(project.description)
    cy.get('.qa-initialize-with-readme-checkbox').check()
    cy.contains('Create project').click()
  })

  Cypress.Commands.add('gui_creatIssue', function(issue) {
    cy.visit(`/${Cypress.env('user_name')}/${issue.project.name}/issues/new`)

    cy.get('#issue_title').type(issue.title)
    cy.get('#issue_description').type(issue.description)
    cy.contains('Submit issue').click()

  })