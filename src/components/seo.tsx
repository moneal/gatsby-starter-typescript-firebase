/**
 * SEO component that queries for data with
 *  Gatsby's useStaticQuery React hook
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
type MetaField =
  | {
      name: string;
      content: string;
    }
  | {
      property: string;
      content: string;
    };

const SEO: React.FC<{
  description?: string;
  lang?: string;
  meta?: MetaField[];
  title: string;
}> = ({ description = "", lang = "en", meta, title }) => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
          }
        }
      }
    `
  );

  const metaDescription =
    description || (site.siteMetadata.description as string | undefined);

  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: `summary`,
        },
        {
          name: `twitter:creator`,
          content: site.siteMetadata.author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
      ].concat(meta || [])}
    />
  );
};

SEO.propTypes = {
  description: PropTypes.string,
  lang: PropTypes.string,
  // meta: PropTypes.arrayOf(PropTypes.object),
  meta: PropTypes.arrayOf(PropTypes.shape({
    property: PropTypes.string,
    name: PropTypes.string,
    content: PropTypes.string.isRequired
  })),
  title: PropTypes.string.isRequired,
};

export default SEO;
