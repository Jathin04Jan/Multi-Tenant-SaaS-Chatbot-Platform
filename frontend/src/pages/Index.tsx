import { Navigate } from 'react-router-dom';

// Index page redirects to landing
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
