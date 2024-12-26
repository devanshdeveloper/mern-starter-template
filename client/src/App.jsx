import { Provider } from "react-redux";
import { BrowserRouter } from "react-router";
import { HelmetProvider } from "react-helmet-async";
import { NextUIProvider } from "@nextui-org/react";
import { store } from "./store";
import AppRoutes from "./routes";

function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Provider store={store}>
          <NextUIProvider>
            <AppRoutes />
          </NextUIProvider>
        </Provider>
      </BrowserRouter>
    </HelmetProvider>
  );
}

export default App;
