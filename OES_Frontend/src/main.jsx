
  import { createRoot } from "react-dom/client";
  import App from "./app/App.jsx";
  import "./styles/index.css";

  const rootElement = document.getElementById("root");
  if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
  }
   else {
  console.error("Root element '#root' not found in HTML!");
  }
  