// import React from "react";
// import { createRoot } from "react-dom/client"; // Only import createRoot
// import App from "./App.jsx";
// import "./index.css";

// const container = document.getElementById("root");
// if (container) {
//   const root = createRoot(container); // Create root
//   root.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>
//   );
// }
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
