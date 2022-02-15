import { graphql } from 'gatsby';

const ALL_TECHNOLOGIES = graphql`
  fragment AllTechnologies on allStrapiTechnologies {
    allStrapiTechnologies {
      edges {
        node {
          name
          strapiId
        }
      }
    }
  }
`


export {
  ALL_TECHNOLOGIES
}