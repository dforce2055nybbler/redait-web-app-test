const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const { data } = await graphql(`
    query getAllSlugCompaniesPages {
      allStrapiCompanies {
        edges {
          node {
            strapiId
            slug
            name
            description
            subtitle
          }
        }
      }
    }
  `)

  data.allStrapiCompanies.edges.map(company => {
    createPage({
      path: '/company/' + company.node.slug,
      component: path.resolve('./src/templates/company-details.js'),
      context: {
        id: company.node.strapiId,
        slug: company.node.slug,
        name: company.node.name,
        description: company.node.description,
        subtitle: company.node.subtitle,
      }
    })
  })


  createPage({
    path: "/using-dsg",
    component: require.resolve("./src/templates/using-dsg.js"),
    context: {},
    defer: true,
  })
}
