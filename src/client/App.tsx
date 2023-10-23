import "./styles/app.scss";
import { ApolloProvider } from '@apollo/client';
import { client } from './apolloClient';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/header";
import CustomersPage from './pages/customersPage';
import ProductsPage from './pages/productsPage';
import HomePage from "./pages/homePage";


function App() {
  return (
    <ApolloProvider client={client}>

      <Router>
        <div className="app">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/customers" element={<CustomersPage />} />
            </Routes>
          </main>
        </div>
      </Router>

    </ApolloProvider>
  );
}

export default App;
