import { createRoot } from "react-dom/client";
import { Button } from "./components/ui/button";
import Home from "./frontend/Home";

const root = createRoot(document.body);
root.render(
  <div>
    <h2 className="text-3xl">Hello from React!</h2>
    <Button>Hello world</Button>
    <Home />
  </div>,
);
