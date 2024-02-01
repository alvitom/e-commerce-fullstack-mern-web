import { Helmet } from "react-helmet";

const HeadElement = ({ pageTitle }) => {
  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Helmet>
    </>
  );
};

export default HeadElement;
