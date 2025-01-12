import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./store/index.ts";
import { BrowserRouter } from "react-router-dom";
import { ReactQueryProvider } from "./contexts/ReactQueryProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <ReactQueryProvider>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ReactQueryProvider>
);
