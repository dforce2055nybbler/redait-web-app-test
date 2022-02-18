import { gql } from '@apollo/client'

const TYPES_OPPORTUNITIES = gql `
  query typesOpportunites {
    typesOpportunitesConnection {
      aggregate {
        totalCount
      }
    }
    typesOpportunites {
      id,
      name
    },
  }
`
const COMPANIES_DETAILED = gql `
  query getAllCompaniesDetailed {
    companies {
      id
      name
      description
      location
      domain
      active
      image {
        id
        url
      }
      talent {
        id
        title
        description
      }
      markets {
        id
        name
        countries {
          id
          name
        }
      }
      partnerships {
        id
        title
        description
      }
      services {
        id
        title
        description
      }
      products {
        id
        title
        description
      }
    }
  }
`

const BUSINESS_OPPORTUNITIES_EVENTS = gql `
  query ($search:String!) {
    businessOpportunities(where:{ _or:
    [{title_contains:$search},{description_contains:$search}]}){
      id
      title
      description
      country {
        id
        name
      },
      region {
        id
        name
      }
      created_at
      published_at
      updated_at
    }
    events(where:{ _or:
      [{title_contains:$search},{description_contains:$search}]}){
        id  
        title
        description
        created_at
        published_at
        updated_at
    },
    opportunities(where:{ _or:
      [{title_contains:$search},{description_contains:$search}]}) {
        id
        title
        description
        company {
          id
          name
          location
        }
        skills {
          id
          name
        }
        opportunities_type {
          id
          name
        }
        programming_langs {
          id
          name
        }
        technologies {
          id
          name
        }
        verticals {
          id
          name
        }
        created_at
        published_at
        updated_at
    }
  }
`
const BUSINESS_OPPORTUNITIES_EVENTS_LIMIT = gql `
  query ($search:String!, $limit:Int!) {
    businessOpportunitiesConnection {
      aggregate {
        count
      }
    }
    businessOpportunities(where:{ _or:
    [{title_contains:$search},{description_contains:$search}]}, limit:$limit){
      id
      title
      description
      country {
        id
        name
      },
      region {
        id
        name
      }
      created_at
      published_at
      updated_at
    }
    eventsConnection(where: { active: true }) {
      aggregate {
        count
      }
    }
    events(where:{ _or:
      [{title_contains:$search},{description_contains:$search}]}, limit:$limit){
        id  
        title
        description
        created_at
        published_at
        updated_at
    },
    opportunitiesConnection(where: { active: true }) {
      aggregate {
        count
      }
    }
    opportunities(where:{ _or:
      [{title_contains:$search},{description_contains:$search}]}, limit:$limit) {
        id
        title
        description
        company {
          id
          name
          location
        }
        skills {
          id
          name
        }
        opportunities_type {
          id
          name
        }
        programming_langs {
          id
          name
        }
        technologies {
          id
          name
        }
        verticals {
          id
          name
        }
        created_at
        published_at
        updated_at
    }
  }
`
const PRODUCTS_SERVICES = gql `
  query ($search:String!, $limit:Int!) {
    productsConnection (where: { active: true }) {
      aggregate { count }
    }
    products (where: {  
      _or: [{title_contains:$search},{description_contains:$search}], 
      active: true}, limit: $limit) {
      id
      title
      description
      created_at
      published_at
      updated_at
    }
    servicesConnection (where: { active: true }) {
      aggregate { count }
    }
    services (where: {  
      _or: [{title_contains:$search},{description_contains:$search}], 
      active: true}, limit: $limit) {
      id
      title
      description
      created_at
      published_at
      updated_at
    }
  }
`
const TALENTS = gql `
  query ($search:String!, $limit:Int!) {
    talentsConnection (where: { active: true }) {
      aggregate { count }
    }
    talents (where: {  
      _or: [{name_contains:$search},{description_contains:$search}], 
      active: true}, limit: $limit) {
      id
      name
      description
      contact
      email
      phone
      profile
      duration
      skills
      experience_year{
        id
        description
      }
      vacancies_type {
        id
        description
      }
      technology {
        id
        name
      }
      company {
        id
        name
        location
      }
      created_at
      published_at
      updated_at
    }
  }

`
const PARTNERSHIPS = gql `
  query ($search:String!, $limit:Int!) {
    partnershipsConnection (where: { active: true }) {
      aggregate { count }
    }
    partnerships (where: {  
      _or: [{title_contains:$search},{description_contains:$search}], 
      active: true}, limit: $limit) {
      id
      title
      description
      created_at
      published_at
      updated_at
    }
  }
`
const OPPORTUNITIES = gql `
  query ($search:String!, $limit:Int!) {
    opportunitiesConnection (where: { active: true }) {
      aggregate { count }
    }
    opportunities (where: {  
      _or: [{title_contains:$search},{description_contains:$search}], 
      active: true}, limit: $limit) {
      id
      title
      description
      company {
        id
        name
      }
      opportunities_type {
        id
        name
      }
      users_permissions_user {
        id
        firstName
        lastName
        username
        email
        role {
          id
          description
          name
        }
      }
      skills {
        id
        name
      }
      programming_langs {
        id
        name
      }
      technologies {
        id
        name
      }
      verticals {
        id
        name
      }
      created_at
      published_at
      updated_at
    }
  }
`
const BUSINESS_OPPORTUNITIES = gql `
  query ($search:String!, $limit:Int!) {
    businessOpportunitiesConnection (where: { active: true }) {
      aggregate { count }
    }
    businessOpportunities (where: {  
      _or: [{title_contains:$search},{description_contains:$search}], 
      active: true}, limit: $limit) {
      id
      title
      description
      created_at
      country {
        id
        name
      }
      region {
        id
        name
      }
      published_at
      updated_at
    }
  }
`
const EVENTS = gql `
  query ($search:String!, $limit:Int!) {
    eventsConnection (where: { active: true }) {
      aggregate { count }
    }
    events (where: {  
      _or: [{title_contains:$search},{description_contains:$search}], 
      active: true}, limit: $limit) {
      id
      title
      description
      created_at
      country {
        id
        name
      }
      region {
        id
        name
      }
      published_at
      updated_at
    }
  }
`


const REGISTER_TALEN = gql `
  mutation registerTalent(
    $companyId:ID!, 
    $contact:String!, 
    $email:String!,
    $phone:String!,
    $profile: ENUM_TALENT_PROFILE!,
    $name:String!,
    $description:String!,
    $vacancies_type:ID!,
    $technology:ID!,
    $experience_year:ID!,
    $duration:String!,
    $skills:String!,
  ){
    createTalent (
      input:{
        data:{
          company: $companyId
          contact: $contact
          email: $email
          phone: $phone
          profile: $profile
          name: $name
          description: $description
          vacancies_type: $vacancies_type
          technology: $technology
          experience_year: $experience_year
          duration: $duration
          skills: $skills
          }
        }
      )
      {
      talent{
        name
        description
        active
        company{
          name
        }
        contact
        email
        phone
        duration
        skills
        technology{
          name
        }
        experience_year{
          description
        }
        vacancies_type{
          title
          description
        }
      }
    }
  }
`

export {
  TYPES_OPPORTUNITIES,
  BUSINESS_OPPORTUNITIES_EVENTS,
  BUSINESS_OPPORTUNITIES_EVENTS_LIMIT,
  COMPANIES_DETAILED,
  PRODUCTS_SERVICES,
  TALENTS,
  PARTNERSHIPS,
  OPPORTUNITIES,
  BUSINESS_OPPORTUNITIES,
  EVENTS,
  REGISTER_TALEN,
}