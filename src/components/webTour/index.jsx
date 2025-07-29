import Joyride from "react-joyride";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setProfileCardOpen } from "../../redux/slices/appTourSlice";

export const WebTour = () => {
  const [runTour, setRunTour] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userRole = "Corpzo";

  const roleMap = {
    Corpzo: "corpzo",
    "Corpzo X": "corpzoX",
  };

  const role = roleMap[userRole] || null;

  const baseTourSteps = {
    corpzo: [
      {
        target: ".corpzo-dashboard-step-1",
        content: (
          <div>
            <h3 className="font-semibold text-lg">Wishlist</h3>
            <p>Here you can view and manage your saved services.</p>
          </div>
        ),

        path: "/dashboard",
      },
      {
        target: ".corpzo-dashboard-step-2",
        content: (
          <div>
            <h3 className="font-semibold text-lg">Messages</h3>
            <p>Here you can view and manage your Messages.</p>
          </div>
        ),
        path: "/dashboard",
      },
      {
        target: ".corpzo-dashboard-step-3",
       content: (
          <div>
            <h3 className="font-semibold text-lg">Notifications</h3>
            <p>Here you can view and manage your Notifications.</p>
          </div>
        ),
        path: "/dashboard",
      },
      {
        target: ".corpzo-dashboard-step-4",
        content: (
          <div>
            <h3 className="font-semibold text-lg">Profile</h3>
            <p>Opens up a sub menu where you can acces Profile, Settings,. etc.</p>
          </div>
        ),
        path: "/dashboard",
      },
      {
        target: ".corpzo-dashboard-step-5",
        content: (
          <div>
            <h3 className="font-semibold text-lg">Switch to CorpzoX</h3>
            <p>By clicking this button you can switch to corpxoX.</p>
          </div>
        ),
        path: "/dashboard",
      },
      {
        target: ".corpzo-dashboard-step-6",
        content: (
          <div>
            <h3 className="font-semibold text-lg">Profile</h3>
            <p>Takes you to your profile.</p>
          </div>
        ),
        path: "/dashboard",
      },
      {
        target: ".corpzo-dashboard-step-7",
        content: (
          <div>
            <h3 className="font-semibold text-lg">Settings</h3>
            <p>Here you can access Settings page</p>
          </div>
        ),
        path: "/dashboard",
      },
      {
        target: ".corpzo-dashboard-step-8",
        content: (
          <div>
            <h3 className="font-semibold text-lg">Business</h3>
            <p>Here you can view and manage your Businesses.</p>
          </div>
        ),
        path: "/dashboard",
      },
      {
        target: ".corpzo-dashboard-step-9",
        content: (
          <div>
            <h3 className="font-semibold text-lg">Fundrasie</h3>
            <p>Switches you to your fundraiser profile on CorpzoX</p>
          </div>
        ),
        path: "/dashboard",
      },
      {
        target: ".corpzo-dashboard-step-10",
        content: (
          <div>
            <h3 className="font-semibold text-lg">Services</h3>
            <p>Here you can view and manage your saved services.</p>
          </div>
        ),
        path: "/dashboard",
      },
      {
        target: ".corpzo-dashboard-step-11",
        content: (
          <div>
            <h3 className="font-semibold text-lg">Payment History </h3>
            <p>Here you can view your Payment History.</p>
          </div>
        ),
        path: "/dashboard",
      },
      {
        target: ".corpzo-dashboard-step-12",
        content: (
          <div>
            <h3 className="font-semibold text-lg">Documents</h3>
            <p>Here you can view and manage your Documents.</p>
          </div>
        ),
        path: "/dashboard",
      },
      {
        target: ".corpzo-dashboard-step-13",
       content: (
          <div>
            <h3 className="font-semibold text-lg">Account Manager</h3>
            <p>Here you can view and manage your Account Manager.</p>
          </div>
        ),
        path: "/dashboard",
      },
      {
        target: ".corpzo-dashboard-step-14",
       content: (
          <div>
            <h3 className="font-semibold text-lg">Offers</h3>
            <p>Here you can view and avail offers on Services.</p>
          </div>
        ),
        path: "/dashboard",
      },
      {
        target: ".corpzo-dashboard-step-15",
        content: (
          <div>
            <h3 className="font-semibold text-lg">Insights</h3>
            <p>Here you can view insights.</p>
          </div>
        ),
        path: "/dashboard",
      },
      {
        target: ".corpzo-dashboard-step-16",
        content: (
          <div>
            <h3 className="font-semibold text-lg">Business</h3>
            <p>Here you can view and manage your Businesses.</p>
          </div>
        ),
        path: "/dashboard",
      },
    ],
    corpzoX: [
      {
        target: ".corpx-step-1",
        content: "Step 1 for Corpzo X role: Dashboard.",
        path: "/dashboard",
      },
      {
        target: ".corpx-step-2",
        content: "Step 2 for Corpzo X role: Settings.",
        path: "/settings",
      },
    ],
  };

  const updatedSteps = (baseTourSteps[role] || []).map((step) => ({
    ...step,
    disableBeacon: true,
  }));

  useEffect(() => {
    const handleStartTour = () => {
      localStorage.setItem("hasCompletedTour", "false");
      setRunTour(true);
      if (pathname !== updatedSteps[0]?.path) {
        navigate(updatedSteps[0].path);
      }
    };

    const hasCompletedTour = localStorage.getItem("hasCompletedTour");
    if (hasCompletedTour === "false") {
      setRunTour(true);
      if (pathname !== updatedSteps[0]?.path) {
        navigate(updatedSteps[0].path);
      }
    }

    window.addEventListener("start-web-tour", handleStartTour);

    return () => {
      window.removeEventListener("start-web-tour", handleStartTour);
    };
  }, []);

  const handleTourCallback = (data) => {
    const { action, index, status } = data;
    const currentStep = updatedSteps[index];
    const previousStep = updatedSteps[index - 1];

    console.log(currentStep, previousStep, "currentStep, previousStep");
    if ((action === "next" || action === "prev") && updatedSteps[index]) {
      navigate(updatedSteps[index].path);
    }

    if (currentStep?.target === ".corpzo-dashboard-step-4") {
      dispatch(setProfileCardOpen(true));
    }

    if (previousStep?.target === ".corpzo-dashboard-step-7") {
      dispatch(setProfileCardOpen(false));
    }
    if (status === "finished" || status === "skipped") {
      localStorage.setItem("hasCompletedTour", "true");
      setRunTour(false);
    }
  };

  if (!role || updatedSteps.length === 0) return null;

  return (
    <Joyride
      key={pathname}
      steps={updatedSteps}
      run={runTour}
      callback={handleTourCallback}
      continuous
      showProgress
      showSkipButton
      disableOverlayClose={true}
      scrollOffset={120}
      styles={{
        options: {
          zIndex: 1001,
          primaryColor: "#884fa7",
        },
        overlay: {
          zIndex: 1001,
        },
      }}
    />
  );
};
