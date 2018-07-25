import React from 'react';

import Header from './Header'
import { Image } from 'semantic-ui-react'

const Home = () => {
  return (
    <div>
      <Header />
      <h1>Seja bem-vindo</h1>
      <div>
        <Image src='/logo-home.png' size={'medium'} centered={true} />
      </div>
    </div>
  );
};

export default Home;