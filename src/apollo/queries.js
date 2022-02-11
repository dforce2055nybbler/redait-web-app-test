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

const BUSINESS_OPPORTUNITIES = gql `
  query getBusinessOpportunities($search:String!) {
    businessOpportunities(where:{ _or:
      [{title_contains:$search},{description_contains:$search}]}){
        title
        description
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
  query ($search:String!, , $limit:Int!) {
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

export {
  TYPES_OPPORTUNITIES,
  BUSINESS_OPPORTUNITIES,
  BUSINESS_OPPORTUNITIES_EVENTS,
  BUSINESS_OPPORTUNITIES_EVENTS_LIMIT,
  COMPANIES_DETAILED
}