import { Suspense } from 'react';
import MainLayout from './components/layouts/main.layout';
import MainRouter from './router';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainRouter />
    </Suspense>
  );
}

export default App;
