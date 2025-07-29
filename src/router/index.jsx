import App from "../App";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/home";
import { SignIn } from "../pages/auth/sign-in";
// import { SignIn1 } from "../pages/corpzo-X/auth/sign-in";
// import { ForgotPassword1} from "../pages/corpzo-X/auth/forgot-password";
import { ForgotPassword } from "../pages/auth/forgot-password";
// import { CreateNewPassword1  } from "../pages/corpzo-X/auth/create-new-password";
// import { Signup1 } from "../pages/corpzo-X/auth/sign-up";
import { ErrorComponent } from "../components/error";
import { AuthWrapper } from "./authWrapper";
import { IsLoggedInWrapper } from "./isLoggedInWrapper";
import { IsRedirectWrapper } from "./isRedirectWrapper";
import { PrimaryLayout } from "../components/layout/primary";
import { Signup } from "../pages/auth/sign-up";
import { Verify } from "../pages/auth/verify";
import { CreateNewPassword } from "../pages/auth/create-new-password";
import Dashboard from "../pages/dashboard";
import ServicesListing from "../pages/services/listing";
import ServiceDetail from "../pages/services/detail";
import BusinessListing from "../pages/business/listing";
import BusinessDetail from "../pages/business/detail";
import MakeAPayment from "../pages/payment/makeAPayment";
import CreateBusiness from "../pages/business/createEdit";
import SelectBusiness from "../pages/payment/selectBusiness";
import BusinessPreview from "../pages/business/preview";
import FundraiseListing from "../pages/fundraise/listing";
import InvestmentListing from "../pages/investment/listing";
import ViewAllFolders from "../pages/documents/listing/ViewAllFolders";
import ChangePassword from "../pages/settings/changePassword";
import PreviewPayment from "../pages/payment/previewPayment";
import DeactivateAccount from "../pages/settings/deactivateAccount";
import SubscriptionHistory from "../pages/settings/subscriptionHistory";
import Settings from "../pages/settings";
import History from "../pages/payment/history";
import Profile from "../pages/profile";
import ProfileEdit from "../pages/profile/editProfile";
import Wishlist from "../pages/wishlist";
import Payments from "../pages/payment";
import DocumentDetail from "../pages/documents/detail";
import OffersDetails from "../pages/offers/components";
import ServiceprogressViewAll from "../pages/services/serviceProgressViewAll";
import { RegistrationDetails } from "../pages/business/createEdit/components/registration";
import { AddressDetails } from "../pages/business/createEdit/components/address";
import { FinancialDetails } from "../pages/business/createEdit/components/financial";
import { KYCDetails } from "../pages/business/createEdit/components/kyc";
import { FundingDetails } from "../pages/business/createEdit/components/funding";
import { ServicesProgress } from "../pages/dashboard/components/services/progress";
import { RecommendedServices } from "../pages/dashboard/components/services/recommended";
import RecommendedServicesViewALl from "../pages/services/recommendServicesViewAll";
import Services from "../pages/admin/services";
import BasicDetails from "../pages/admin/services/BasicDetails";
import ServiceForm from "../pages/admin/services/serviceForm";
import AddOrEditFundraise from "../pages/fundraise/createEdit";
import { PastFundings } from "../pages/fundraise/createEdit/components/pastFundings";
import { CurrentFunding } from "../pages/fundraise/createEdit/components/currentFunding";
import { PitchDeck } from "../pages/fundraise/createEdit/components/pitchDeck";
import { PastRevenue } from "../pages/fundraise/createEdit/components/pastRevenue";
import { FundraisePreview } from "../pages/fundraise/preview";
import DocumentsListing from "../pages/documents/listing";
import UserDocumentsListing from "../pages/userDocuments/listing";

import ViewAllDocuments from "../pages/documents/listing/ViewAllDocuments";
// import ViewAllDocuments from "../pages/userDocuments/listing/index";

import ViewAllInsights from "../pages/Insights";
import InsightDetail from "../components/insight/InsightDetail/insightDetail";
import { SecondaryLayout } from "../components/layout/secondary";
import { Messages } from "../components/messages";
import { NotificationDetail } from "../components/notification/detail";
import MessagePage from "../pages/messages";
import IntroVideo from "../pages/auth/introVideo/intro-video";
import { FundingReason } from "../pages/fundraise/createEdit/components/reason";
import FolderDetail from "../pages/documents/detail/folderDetail";
import { Documents } from "../pages/fundraise/createEdit/components/documents";
import { ServiceFolder } from "../pages/documents/listing/serviceFolder";
import { YourFiles } from "../pages/documents/listing/yourFiles";
import { YourDocuments } from "../pages/documents/listing/yourDocuments";
import VerifyUser from "../pages/auth/verify-user";
import { FolderDocuments } from "../pages/documents/listing/folderDocuments";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/*",
        element: <ErrorComponent />,
      },
      //protected routes
      {
        path: "/",
        element: <AuthWrapper />,
        children: [],
      },
     
      //   isLoggedIn route
      {
        path: "/",
        element: <IsLoggedInWrapper />,
        children: [
          {
            path: "sign-in",
            element: <SignIn />,
          },
          {
            path: "sign-up",
            element: <Signup />,
          },
          {
            path: "forgot-password",
            element: <ForgotPassword />,
          },
          {
            path: "create-new-password",
            element: <CreateNewPassword />,
          },
          {
            path: "verify",
            element: <Verify />,
          },
          {
            path: "intro-video",
            element: <IntroVideo />,
          },
          {
            path : "verify_temp_user/:userId", 
            element : <VerifyUser/>
          }
          
        ],
      },
      //redirect check
      {
        path: "/",
        element: <IsRedirectWrapper />,
        children: [
          // {
          //   path: "verify-email",
          //   element: <EmailVerification />,
          // },
        ],
      },
      // Main Layout Wrapper
      {
        path: "/",
        element: <PrimaryLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          
          // Business routes
          {
            path: "business",
            children: [
              {
                index: true,
                element: <BusinessListing />,
              },

              {
                path: "create",
                element: <CreateBusiness />,
                children: [
                  { index: true, element: <RegistrationDetails /> }, // Default child for /create
                  { path: "registration", element: <RegistrationDetails /> },
                  { path: "address", element: <AddressDetails /> },
                  { path: "financial", element: <FinancialDetails /> },
                  { path: "kyc", element: <KYCDetails /> },
                  { path: "funding", element: <FundingDetails /> },
                ],
              },
              {
                path: "edit",
                element: <CreateBusiness isEdit={true} />,
                children: [
                  {
                    index: true,
                    element: <RegistrationDetails isEdit={true} />,
                  }, // Default child for /edit
                  {
                    path: "registration",
                    element: <RegistrationDetails isEdit={true} />,
                  },
                  {
                    path: "address",
                    element: <AddressDetails isEdit={true} />,
                  },
                  {
                    path: "financial",
                    element: <FinancialDetails isEdit={true} />,
                  },
                  { path: "kyc", element: <KYCDetails isEdit={true} /> },
                  {
                    path: "funding",
                    element: <FundingDetails isEdit={true} />,
                  },
                ],
              },
              // {
              //   path: "edit",
              //   element: <CreateBusiness isEdit={true} />,
              // },
              {
                path: "preview",
                element: <BusinessPreview />,
              },
              {
                path: "detail",
                element: <BusinessDetail />,
              },
            ],
          },
          // Services routes
          {
            path: "services",
            children: [
              {
                index: true,
                element: <ServicesListing />,
              },
              {
                path: ":categoryId/:subCategoryId",
                element: <ServicesListing />,
              },
              {
                path: "create/:serviceId",
                element: <ServiceDetail />,
              },
              {
                path: "edit/:serviceId",
                element: <ServiceDetail />,
              },
              {
                path: "detail/:serviceId",
                element: <ServiceDetail />,
              },
              {
                path: "serviceprogressdetail",
                element: <ServiceprogressViewAll />,
              },
              {
                path: "recommended-services-view-all",
                element: <RecommendedServicesViewALl />,
              },
            ],
          },
          // Payment route
          {
            path: "payment",
            element: <Payments />,
            children: [
              {
                path: ":serviceId/:subscriptionId",
                element: <MakeAPayment />,
              },
              {
                path: ":serviceId/:quotationId",
                element: <MakeAPayment />,
              },
              {
                path: ":serviceId",
                element: <MakeAPayment />,
              },
              {
                path: "create/:applicationId/:navigationId",
                element: <SelectBusiness />,
              },
              {
                path: "preview/:applicationId",
                element: <PreviewPayment />,
              },
              {
                path: "history",
                element: <History />,
              },
            ],
          },
          
          // Fundraise route
          {
            path: "fundraise",
            children: [
              {
                index: true,
                element: <FundraiseListing />,
              },
              {
                path: "create",
                element: <AddOrEditFundraise />,
                children: [
                  { index: true, element: <PastFundings /> },
                  { path: "current-funding/:fundId", element: <CurrentFunding /> },
                  { path: "pitch-deck/:fundId", element: <PitchDeck /> },
                  { path: "documents/:fundId", element: <Documents /> },
                  { path: "past-revenue/:fundId", element: <PastRevenue /> },
                  { path: "funding-reason/:fundId", element: <FundingReason /> },
                  { path: "preview/:fundId", element: <FundraisePreview /> },
                ],
              },
              {
                path: "update",
                element: <AddOrEditFundraise />,
                children: [
                  { index: true, element: <PastFundings isEdit={true} /> },
                  // { path: ":fundId", element: <PastFundings isEdit={true} /> },
                  { path: "current-funding", element: <CurrentFunding isEdit={true} /> },
                  { path: "pitch-deck", element: <PitchDeck isEdit={true} /> },
                  { path: "documents", element: <Documents /> },
                  { path: "past-revenue", element: <PastRevenue isEdit={true} /> },
                  { path: "funding-reason", element: <FundingReason /> },
                  { path: "preview", element: <FundraisePreview isEdit={true} /> },
                ],
              },
            ],
          },
          // Investment route
          {
            path: "investment",
            children: [
              {
                index: true,
                element: <InvestmentListing />,
              },
            ],
          },
          // User Documents route
          {
            path: "documents",
            element: <DocumentsListing />,
            children: [
              {
                index: true,
                element: <ServiceFolder />,
              },
              {
                path: "your-files",
                element: <YourFiles />,
              },
              {
                path: "your-documents",
                element: <YourDocuments />,
              },

              {
                path: "detail/:id",
                element: <DocumentDetail />,
              },
              {
                path: "folderdetail/:id",
                element: <FolderDetail />,
              },
              {
                path: "view-all-documents",
                element: <ViewAllDocuments />,

              },
              {
                path: "view-all-folders",
                element: <ViewAllFolders />,
              },
            ],
          },
          {
            path: "user-documents",
            children: [
              {
                index: true,
                element: <UserDocumentsListing />,
              },

              {
                path: "detail/:id",
                element: <DocumentDetail />,
              },
              {
                path: "folderdetail/:id",
                element: <FolderDetail />,
              },
              {
                path: "view-all-documents",
                element: <ViewAllDocuments />,
              },
              {
                path: "view-all-folders",
                element: <ViewAllFolders />,
              },
              {
                path: "folder-documents/:id",
                element: <FolderDocuments />,
              },
            ],
          },
          // Settings route
          {
            path: "settings",
            element: <Settings />,
            children: [
              {
                index: true,
                element: <ChangePassword />,
              },
              {
                index: "change-password",
                element: <ChangePassword />,
              },
              {
                path: "deactivate-account",
                element: <DeactivateAccount />,
              },
              {
                path: "subscription-history",
                element: <SubscriptionHistory />,
              },
            ],
          },
          // Profile route
          {
            path: "profile",
            children: [
              {
                index: true,
                element: <Profile />,
              },
              {
                path: "edit",
                element: <ProfileEdit />,
              },
            ],
          },

          {
            path: "intro-video",
            children: [
              {
                index: true,
                element: <IntroVideo />,
              },
            ],
          },
          // Wishlist route
          {
            path: "wishlist",
            children: [
              {
                index: true,
                element: <Wishlist />,
              },
            ],
          },
          {
            path: "view-all-insights",
            element: <ViewAllInsights />
          },
          {
            path: "insight-details/:insightId",
            element: <InsightDetail />
          },
          {
            path: "offersDetails",
            children: [
              {
                index: true,
                element: <OffersDetails />,
              },
            ],
          },
         
          {
            path: "notifications",
            element: <NotificationDetail />,
          },
        ],
      },
      // Second Layout Wrapper
      {
        path: "/",
        element: <SecondaryLayout />,
        children: [
          {
            path: "messages",
            element: <MessagePage />,
          },

        ],
      },
      // adminroutes
      {
        path: "/admin",
        element: <PrimaryLayout />,
        children: [
          {
            path: "services",
            element: <Services />,
          },
          // {
          //   path: "services/create-service",
          //   element : <BasicDetails/>
          // },
          {
            path: "services/create-service",
            element: <ServiceForm />,
          },
          {
            path: "services/update-service/:id",
            element: <BasicDetails />,
          },
        ],
      },
    ],
  },
]);

export const RouterConfigration = () => {
  return <RouterProvider router={router} />;
};
