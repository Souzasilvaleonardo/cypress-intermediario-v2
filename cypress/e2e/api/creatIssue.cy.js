import { faker } from '@faker-js/faker'

describe('Create issue', function() {
  beforeEach(function() {
    cy.api_deleteProjects()
  })

  it('successfully', function() {
    const issue = {
      title: `issue-${faker.datatype.uuid()}`,
      description: faker.random.words(3),
      project: {
        name: `project-${faker.datatype.uuid()}`,
        description: faker.random.words(5)
      }
    }

    cy.api_createIssue(issue)
      .then(function(response) {
        expect(response.status).to.equal(201)
        expect(response.body.title).to.equal(issue.title)
        expect(response.body.description).to.equal(issue.description)
      })
  })
})