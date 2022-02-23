import { graphql } from 'gatsby';

const ALL_COMPANIES = graphql`
  fragment AllCompanies on StrapiCompanies {
    name
    strapiId
  }
`


export {
  ALL_COMPANIES
}