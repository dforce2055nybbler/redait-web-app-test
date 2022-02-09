import fetch from 'isomorphic-fetch'
import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat } from '@apollo/client'

const httpLink = new HttpLink({
  uri: process.env.GATSBY_STRAPI_URL + '/graphql',
  fetch
});


const storedUser =
  typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('user'))
    : null;


const authMiddleware = new ApolloLink((operation, forward) => {
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: `Bearer ${storedUser.jwt}`,
      }
    }));
  
    return forward(operation);
  })

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink)
});


export default client