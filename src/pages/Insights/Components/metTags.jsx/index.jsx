import React, { useEffect, useState } from 'react';
import MetaTags from 'react-meta-tags';

const ShareMetaTags = ({ pageTitle, pageDescription, pageImage }) => {
  const defaultImage = 'images/auth/auth-main.svg'; // Image is in the public folder
  const pathName = window.location.pathname.substring(1);
  const [metaTitle, setMetaTitle] = useState(pageTitle || "CorpZo");
  const [metaDescription, setMetaDescription] = useState(pageDescription || "CORPZO - Your one-stop platform for corporate legal and finance services.");
  const [metaImage, setMetaImage] = useState(pageImage || defaultImage);

  useEffect(() => {
    // You can add dynamic logic here if needed, for example, fetching the content
    // from an API or dynamically updating the state based on the page content.
    if (pageTitle) setMetaTitle(pageTitle);
    if (pageDescription) setMetaDescription(pageDescription);
    if (pageImage) setMetaImage(pageImage);
  }, [pageTitle, pageDescription, pageImage]);

  return (
    <div className="wrapper">
      <MetaTags>
        <title>{metaTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={metaImage} />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <meta name="twitter:image" content={metaImage} />
      </MetaTags>
    </div>
  );
};

export default ShareMetaTags;
