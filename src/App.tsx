import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from './components/Header';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Categorias from './pages/Categorias';
import Produtos from './pages/Produtos';
import Error404 from './pages/Error404';
import { Card } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';


const routes = createBrowserRouter([
  {
    path: '/',
    element: <div>Bem-vindo</div>,
    errorElement: <Error404 />
  },
  {
    path: '/categorias',
    element: <Categorias />,
  },
  {
    path: '/produtos',
    element: <Produtos />
  }
])

function App() {
  return (
    <>
      <div style={
        { height: '100vh', backgroundColor: '#Ecece9' }
      }>
        <Header />
        <Container className='mt-5' style={
          {
            border: '1px dashed grey',
            minHeight: '75vh',
            backgroundColor: 'white',
            boxShadow: ' 10px 5px 5px #e0dcdc'
          }
        }>
          <RouterProvider router={routes} />
        </Container>
      </div>
    </>
  );
}

export default App;
