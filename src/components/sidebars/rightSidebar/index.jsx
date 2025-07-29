import { Insight } from "../../insight";
import { Offers } from "../../offers";

export const RightSidebar = ({ className }) => {
  return (
    <div className={`${className}`}>
      <Offers />
      <Insight />
    </div>
  );
};