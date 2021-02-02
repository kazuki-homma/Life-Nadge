import { useState } from 'react';

import '../../styles/globals.css'
import Layout from '../components/layout';

function MyApp({ Component, pageProps }) {
  const [everydayPoint, addEverydayPoint] = useState(0);
  return (
    <Layout>
      <Component 
        {...pageProps} 
        everydayPoint={everydayPoint}
        addEverydayPoint={addEverydayPoint}
      />
    </Layout>
  );
}

export default MyApp;
