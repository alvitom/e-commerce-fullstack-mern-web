import { Helmet, HelmetProvider } from "react-helmet-async";

const HeadElement = ({ pageTitle }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>{pageTitle}</title>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </Helmet>
    </HelmetProvider>
  );
};

export default HeadElement;
