import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { RouterConfigration } from "./router/index.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { HelmetProvider } from "react-helmet-async";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
        <HelmetProvider>

  <GoogleOAuthProvider clientId="308533527726-5vcj3hnm8pu1in31t0bvjk4ggao2v1vp.apps.googleusercontent.com">
    <RouterConfigration />
  </GoogleOAuthProvider>
  </HelmetProvider>

  </Provider>
  // {/* <App /> */}
  // </StrictMode>,
);
