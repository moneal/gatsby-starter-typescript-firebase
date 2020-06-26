import React from "react";
import { Link } from "gatsby"
import PropTypes from "prop-types"

const Footer: React.FC<{
  siteTitle?: string,
}> = ({siteTitle}) => {
  return (
    <footer
      style={{
        background: `rebeccapurple`,
        marginBottom: `1.45rem`,
      }}
    >
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 960,
          padding: `1.45rem 1.0875rem`,
        }}
      >
        © {new Date().getFullYear()} {` `}
        <Link to="/">{siteTitle}</Link>. All rights reserved.
      </div>
    </footer>
  );
};

Footer.propTypes = {
  siteTitle: PropTypes.string,
}

export default Footer;
