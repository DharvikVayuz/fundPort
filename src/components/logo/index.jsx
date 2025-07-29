import { useEffect } from "react";

export const Logo = ({ favicon = "/vayuzfavicon.ico" }) => {
  useEffect(() => {
    const link = document.querySelector("link[rel~='icon']");
    
    if (link) {
      link.href = favicon;
    } else {
      const newLink = document.createElement("link");
      newLink.rel = "icon";
      newLink.href = favicon;
      document.head.appendChild(newLink);
    }
  }, [favicon]);

  return null; // This component doesn't render anything
};
