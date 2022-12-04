/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-browser/
 */

// You can delete this file if you're not using it
exports.onRouteUpdate = ({location}) => {
  console.log('new pathname', location.pathname);
  if (window.MathJax !== undefined && typeof window.MathJax.typeset === "function" ) {
    window.MathJax.typeset();
  }
};