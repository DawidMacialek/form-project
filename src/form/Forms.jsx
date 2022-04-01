import React, { useEffect } from 'react';
import { useState } from 'react';
import {
  Accesories,
  Computer,
  Monitor,
  Office,
  Software,
  AnyOther,
} from './index.js';
import { Form } from 'react-bootstrap';

function Forms() {
  const [category, setCategory] = useState('');

  function handleOnchange(e) {
    setCategory(e.target.value);
  }

  function chosenForm(category) {
    switch (category) {
      case 'computer':
        return <Computer />;
      case 'monitor':
        return <Monitor />;
      case 'office':
        return <Office />;
      case 'software':
        return <Software />;
      case 'accesories':
        return <Accesories />;
      case 'other':
        return <AnyOther />;
      default:
        return null;
    }
  }
  // useEffect(() => {
  //   chosenForm(category);
  //   console.log(chosenForm(category));
  //   console.log(`zmiana na ${category}`);
  // }, [category]);
  return (
    <div>
      <h1>Costomize your dev workplace</h1>
      <Form>
        <Form.Select
          size='lg'
          aria-label='select category'
          onChange={handleOnchange}
        >
          <option>Pick a category</option>
          <option value='computer'>Computer</option>
          <option value='monitor'>monitor</option>
          <option value='office'>office equimpment</option>
          <option value='software'>software</option>
          <option value='accesories'>accesories</option>
          <option value='other'>any other</option>
        </Form.Select>
      </Form>
      {chosenForm(category)}
    </div>
  );
}

export default Forms;
