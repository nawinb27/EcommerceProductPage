import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Components/Nav';
import Product from './Components/Product';
import { StoreProvider } from './Store';

function App() {
  return (
    <div>
      <StoreProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Nav />
                  <Product />
                </>
              }
            ></Route>
          </Routes>
        </BrowserRouter>
      </StoreProvider>
    </div>
  );
}

export default App;
