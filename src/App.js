import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { useGetUserProfileQuery } from './slices/usersApiSlice';
import { setCredentials } from './slices/authSlice';
import { loadUserCart } from './slices/cartSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const dispatch = useDispatch();
  
  // Skip the query if there's no cookie
  const { data: userProfile, isSuccess } = useGetUserProfileQuery('', {
    pollingInterval: 0, // Disable polling
    refetchOnMountOrArgChange: false,
    skip: !document.cookie.includes('jwt'), // Skip if no JWT cookie
  });
//gfghjkjhg
  useEffect(() => {
    if (isSuccess && userProfile) {
      dispatch(setCredentials(userProfile));
      dispatch(loadUserCart(userProfile)); // Load cart data
    }
  }, [dispatch, isSuccess, userProfile]);

  return (
    <>
      <ToastContainer />
      <Header />
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
