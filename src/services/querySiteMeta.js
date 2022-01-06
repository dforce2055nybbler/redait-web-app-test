import { graphql, useStaticQuery } from 'gatsby';

const querySiteMeta = () => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  return data;
};

export default querySiteMeta;
