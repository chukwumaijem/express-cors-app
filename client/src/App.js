import React from 'react';
import { random, name, address, phone } from 'faker';
import axios from 'axios';

import './App.css';

const baseURL = 'http://localhost:5000';

function App() {
  const makePost = async () => {
    const data = {
      id: random.uuid(),
      name: `${name.firstName()} ${name.lastName()}`,
      address: `${address.streetAddress()} ${address.county()} ${address.state()}`,
      phone: phone.phoneNumber(),
    };
    try {
      await axios.post(`${baseURL}/`, data);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const makeGet = () => { };
  const makePut = () => { };
  const makeDelete = () => { };

  return (
    <div className="App">
      <button onClick={makePost}>Post</button>
      <button onClick={makeGet}>Get</button>
      <button onClick={makePut}>Put</button>
      <button onClick={makeDelete}>Delete</button>
    </div>
  );
}

export default App;
