import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { PayPalScriptProvider } from "@paypal/react-paypal-js"

createRoot(document.getElementById("root")!).render(
  <PayPalScriptProvider options={{ clientId: "Acw1XaVUIzI2O5m0-xkelBf7kY1eV6Q50KutDBY9J4uEMBX1VvICGM62IxCrUKehg-E5u5O824c2UGe0" }}>
    <App />
  </PayPalScriptProvider>
)
