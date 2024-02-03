import { faker } from '@faker-js/faker'

const options = { env: { snapshotOnly: true }}

describe('Create Issue', options, function() {
    const issue = {
      title: `issue-${faker.datatype.uuid()}`,
      description: faker.random.words(3),
      project: {
        name: `project-${faker.datatype.uuid()}`,
        description: faker.random.words(5)
      }
    }


    beforeEach(function() {
        cy.api_deleteProjects()
        cy.login()
        cy.api_createProject(issue.project)
        
    })
    

    it('successfully', function() {
        cy.gui_creatIssue(issue)

        cy.get('.issue-details')
      .should('contain', issue.title)
      .and('contain', issue.description)
    })
})
