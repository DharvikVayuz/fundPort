import { GoArrowLeft } from "react-icons/go";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Heading } from "../../components/heading";

const Settings = () => {
  const navigate = useNavigate();

  const tabs = [
    {
      label: "Change Password",
      icon: "/icons/settings/lock.svg",
      url: "/settings",
    },
    {
      label: "Deactivate Account",
      icon: "/icons/settings/deactivate.svg",
      url: "/settings/deactivate-account",
    },
    {
      label: "Subscription History",
      icon: "/icons/settings/subscriptions.svg",
      url: "/settings/subscription-history",
    },
  ];
  return (
    <div className="pb-4">
      <Heading backButton={true}>Settings</Heading>

      {/* Tabs */}
      <Tabs tabs={tabs} />
      <Outlet />
    </div>
  );
};

export default Settings;

const Tabs = ({ tabs }) => {
  const { pathname } = useLocation();
  return (
    <div className="py-2 flex flex-wrap items-center gap-4">
      {tabs.map((data, index) => (
        <Link
          to={data.url}
          className={`flex items-center gap-1 pb-1 ${
            pathname == data.url && "border-b-2 border-[#F1359C] rounded"
          }`}
          key={index}
        >
          <img src={data.icon} alt="icon" />
          <p className={`${pathname == data.url && "font-bold"}`}>
            {data.label}
          </p>
        </Link>
      ))}
    </div>
  );
};
