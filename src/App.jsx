import { lazy, Suspense } from "react";

import {
 BrowserRouter as Router,
 Routes,
 Route,
 Navigate,
} from "react-router-dom";
import { LoadingSpinner } from "./components/LoadingSpinner";
import ErrorPage from "./pages/ErrorPage";
import RestrictForAdmins from "./components/RestrictForAdmins";
import RestrictForLoggedIn from "./components/RestrictForLoggedIn";
import { UsersProvider } from "./context/usersContext";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./rtl/store";
import CartPage from "./pages/CartPage";
import { ProductsProvider } from "./context/productsContext";
import WishlistPage from "./pages/WishlistPage";

const ProductsList = lazy(() => import("./components/ProductsList"));
const ProductDetails = lazy(() => import("./components/ProductDetails"));
const HomePage = lazy(() => import("./pages/HomePage"));
const Dashboard = lazy(() => import("./components/Dashboard"));
const Layout = lazy(() => import("./components/Layout"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));

function App() {
 return (
  <Suspense fallback={<LoadingSpinner />}>
   <Router>
    <ProductsProvider>
     <UsersProvider>
      <PersistGate persistor={persistor}>
       <Provider store={store}>
        <Routes>
         <Route index element={<Navigate replace to={"/home"} />} />
         <Route element={<Layout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/products" element={<ProductsList />} />
          <Route path="/dashboard" element={<RestrictForAdmins />}>
           <Route index element={<Dashboard />} />
          </Route>
          <Route path="/cart" element={<RestrictForLoggedIn />}>
           <Route index element={<CartPage />} />
          </Route>
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
         </Route>
         <Route path="*" element={<ErrorPage />} />
        </Routes>
       </Provider>
      </PersistGate>
     </UsersProvider>
    </ProductsProvider>
   </Router>
  </Suspense>
 );
}

export default App;
