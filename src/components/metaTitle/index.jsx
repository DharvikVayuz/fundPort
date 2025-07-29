import { useEffect } from "react";

const projectName = "Corpzo";

export const MetaTitle = ({ title }) => {
  useEffect(() => {
    document.title = ` ${title} - ${projectName}`;
    window.scrollTo(0, 0);
  }, [title]);

  return null;
};
