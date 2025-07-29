import "./App.css";
import { Provider, useDispatch, useSelector } from "react-redux";
import { store, persistor } from "./redux/store";
import { Outlet, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Tooltip } from "./components/tooltip";
import { OnlineStatus } from "./components/onlineStatus";
import { ScrollToTopButton } from "./components/scrollToTop";
import LoginToken from "./components/loginToken";
import { WebTour } from "./components/webTour";




function App() {

    
  return (
    // <Provider store={store}>
    //   <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
    //     {/* <ThemeProvider> */}
    //       <Outlet />
    //       <Tooltip id="my-tooltip" />
    //       <ScrollToTopButton />
    //       <Toaster />
    //       <OnlineStatus />
    //     {/* </ThemeProvider> */}
    //   </PersistGate>
    // </Provider>
    <>
  
  <LoginToken/>
      <Outlet />
      
          <Tooltip id="my-tooltip" />
           <ScrollToTopButton />
           <Toaster />
           <OnlineStatus />
           <WebTour/>
    </>
  );
}

export default App;