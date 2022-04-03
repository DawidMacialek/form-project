import React, { useEffect } from 'react';
import { useState } from 'react';

import FormElement from './FormElement';
import { Form } from 'react-bootstrap';

function Forms() {
  const [category, setCategory] = useState('Pick a category');
  const [isChecked, setIsChecked] = useState(true);

  const data = [
    {
      computer: {
        pc: [
          { label: 'cpu', text: '', price: 0 },
          { label: 'videoCard', text: '', price: 0 },
          { label: 'memory', text: '', price: 0 },
          { label: 'storage', text: '', price: 0 },
          { label: 'other parts', text: '', price: 0 },
        ],
        laptop: [
          { label: 'brand', text: '' },
          { label: 'model', text: '' },
          { label: 'cpu', text: '' },
          { label: 'screen', text: '' },
          { label: 'storage', text: '' },
          { label: 'other parts', text: '' },
          { label: '$', price: 0 },
        ],
      },
    },
    {
      monitor: [
        { label: 'brand', text: '' },
        { label: 'model', text: '' },
        { label: 'size', text: '' },
        { label: '$', price: 0 },
      ],
    },
    {
      accesories: [
        { label: 'mouse', text: '', price: 0 },
        { label: 'keyboard', text: '', price: 0 },
      ],
    },
    {
      office: [
        { label: 'desk', text: '', price: 0 },
        { label: 'chair', text: '', price: 0 },
      ],
    },
    {
      software: [
        { label: 'os', text: '', price: 0 },
        { label: 'other', text: '', price: 0 },
      ],
    },
    {
      other: [
        { label: 'item 1', text: '', price: 0 },
        { label: 'item 2', text: '', price: 0 },
        { label: 'item 3', text: '', price: 0 },
      ],
    },
  ];

  const index = data.findIndex((item) => item.hasOwnProperty(category));

  let currentData = [];
  if (category !== 'Pick a category') {
    if (category === 'computer' && isChecked) {
      currentData = data[index][category].pc;
    } else if (category === 'computer' && !isChecked) {
      currentData = data[index][category].laptop;
    } else {
      currentData = data[index][category];
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
    <div>
      <h1>Customize your dev workplace</h1>
      <Form>
        <Form.Select
          size='lg'
          aria-label='select category'
          onChange={handleOnchangeCategory}
        >
          <option>Pick a category</option>
          {data.map((item, i) => {
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
            <Form onChange={handleOnChangeIsChecked}>
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
