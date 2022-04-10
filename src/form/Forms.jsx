import React from 'react';
import { useState } from 'react';
import { initData } from '../initData/initData';
import FormElement from './FormElement';
import { Form } from 'react-bootstrap';

function Forms() {
  const [category, setCategory] = useState('Pick a category');
  const [isChecked, setIsChecked] = useState(true);

  const index = initData.findIndex((item) => item.hasOwnProperty(category));

  let currentData = [];
  if (category !== 'Pick a category') {
    if (category === 'computer' && isChecked) {
      currentData = initData[index][category].pc;
    } else if (category === 'computer' && !isChecked) {
      currentData = initData[index][category].laptop;
    } else {
      currentData = initData[index][category];
    }
  }

  function handleOnchangeCategory(e) {
    setCategory(e.target.value);
    setIsChecked(true);
  }
  function handleOnChangeIsChecked() {
    setIsChecked((prev) => !prev);
  }

  return (
    <div className='form-container'>
      <h3>Customize your dev workplace</h3>
      <Form>
        <Form.Select
          className='select-category'
          size='lg'
          aria-label='select category'
          onChange={handleOnchangeCategory}
        >
          <option>Pick a category</option>
          {initData.map((item, i) => {
            return (
              <option key={i} value={Object.keys(item)}>
                {Object.keys(item)}
              </option>
            );
          })}
        </Form.Select>
      </Form>
      {category !== 'Pick a category' && (
        <>
          {category === 'computer' ? (
            <Form className='computer-type' onChange={handleOnChangeIsChecked}>
              <Form.Check
                inline
                label='PC'
                aria-label='PC'
                name='computer'
                type='radio'
                id='check-pc'
                defaultChecked
              />
              <Form.Check
                inline
                label='Laptop'
                aria-label='laptop'
                name='computer'
                type='radio'
                id='check-laptop'
              />
            </Form>
          ) : null}
          <FormElement
            category={category}
            currentData={currentData}
            isChecked={isChecked}
          />
        </>
      )}
    </div>
  );
}

export default Forms;
