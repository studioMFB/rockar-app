import "./styles/App.scss";
import { ApolloProvider } from '@apollo/client';
import { client } from './apolloClient';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/header";
import CustomerListPage from './pages/customerListPage';
import ProductListPage from './pages/productListPage';
import HomePage from "./pages/homePage";
import CustomerPage from "./pages/customerPage";



function App() {
  return (
    <ApolloProvider client={client}>

      <Router>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductListPage />} />
              <Route path="/customers" element={<CustomerListPage />} />
              <Route path="/customer/:forename/:surname" element={<CustomerPage />} />
            </Routes>
          </main>
        </div>
      </Router>

    </ApolloProvider>
  );
}

export default App;
