import React from 'react';
import { random, name, address, phone } from 'faker';
import axios from 'axios';

import './App.css';

const baseURL = 'http://localhost:5000';

function App() {
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }

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

  const makeGet = async () => {
    try {
      const response = await axios.get(`${baseURL}/`);
      const { data: { data } } = response;
      console.log('====data===', data);

      return data;
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const makePut = async () => {
    const data = await makeGet();

    const ids = Object.keys(data);
    const id = ids[getRandomInt(ids.length)];
    if (!id) return;

    try {
      const data = {
        name: `${name.firstName()} ${name.lastName()}`,
      };

      await axios.put(`${baseURL}/${id}`, data);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  const makeDelete = async () => {
    const data = await makeGet();
    const ids = Object.keys(data);
    const id = ids[getRandomInt(ids.length)];
    if (!id) return;

    try {
      await axios.delete(`${baseURL}/${id}`);
    } catch (error) {
      console.log('Error: ', error);
    }
  };

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
