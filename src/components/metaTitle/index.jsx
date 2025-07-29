import { useEffect } from "react";

const projectName = "VAYUZ";

export const MetaTitle = ({ title }) => {
  useEffect(() => {
    document.title = ` ${title} - ${projectName}`;
    window.scrollTo(0, 0);
  }, [title]);

  return null;
};
