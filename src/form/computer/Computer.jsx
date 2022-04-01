import React, { useState } from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';

function Computer() {
  const [isChecked, setIsChecked] = useState(true);
  function handleOnChange() {
    setIsChecked((prev) => !prev);
  }

  const data = [
    {
      computer: [
        { part: 'cpu', text: '', price: 0 },
        { part: 'videoCard', text: '', price: 0 },
        { part: 'memory', text: '', price: 0 },
        { part: 'storage', text: '', price: '' },
        { part: 'otherParts', text: '', price: 0 },
      ],
    },
  ];
  console.log(data[0].computer);
  console.log(isChecked);
  return (
    <div>
      <Form onChange={handleOnChange}>
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
      {isChecked === true ? (
        <div>
          <Form>
            {data[0].computer.map((option, i) => {
              return (
                <Row key={i} className=' align-items-center m-2'>
                  <InputGroup
                    xs='auto '
                    size='md'
                    md='4'
                    className='form-group'
                  >
                    <InputGroup.Text className='form-option-label'>
                      {option.part}
                    </InputGroup.Text>
                    <Form.Control type='text' />
                    <InputGroup.Text className='form-dollar'>$</InputGroup.Text>
                    <Form.Control className='form-price-label' type='number' />
                  </InputGroup>
                </Row>
              );
            })}
            <Row xs='auto' className='my-3  justify-content-center'>
              <Col>
                <Button className='p-2 m-2' variant='primary' type='submit'>
                  Submit
                </Button>
              </Col>
            </Row>{' '}
            {/* <Row className=' align-items-center m-3'>
              <InputGroup xs='auto ' md='4' className='form-group'>
                <InputGroup.Text>Cpu</InputGroup.Text>
                <Form.Control type='text' />
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control type='number' />
              </InputGroup>
              <InputGroup xs='auto ' md='4' className='form-group'>
                <InputGroup.Text>Video card</InputGroup.Text>
                <Form.Control type='text' />
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control type='number' />
              </InputGroup>
              <InputGroup xs='auto ' md='4' className='form-group'>
                <InputGroup.Text>Memory</InputGroup.Text>
                <Form.Control type='text' />
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control type='number' />
              </InputGroup>
              <InputGroup xs='auto ' md='4' className='form-group'>
                <InputGroup.Text>Storage</InputGroup.Text>
                <Form.Control type='text' />
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control type='number' />
              </InputGroup>
              <InputGroup xs='auto ' md='4' className='form-group'>
                <InputGroup.Text>Other parts</InputGroup.Text>
                <Form.Control type='text' />
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control type='number' />
              </InputGroup>
            </Row>
            <Row xs='auto' className='my-3  justify-content-center'>
              <Col>
                <Button className='p-2 m-2' variant='primary' type='submit'>
                  Submit
                </Button>
              </Col>
            </Row> */}
          </Form>
        </div>
      ) : (
        <h2>Komputer laptop</h2>
      )}
    </div>
  );
}

export default Computer;
