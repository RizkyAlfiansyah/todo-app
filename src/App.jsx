import { Suspense } from 'react';
import MainRouter from './router';

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainRouter />
    </Suspense>
  );
}

export default App;
