import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';

function FormElement({ category, currentData, isChecked }) {
  const [formValues, setFormValues] = useState(currentData);

  useEffect(() => {
    setFormValues(currentData);
  }, [currentData]);

  function handleOnInputsChange(e) {
    e.preventDefault();
    const { value, name, cat } = e.target;

    setFormValues((prevState) => {
      return prevState.map((element) => {
        if (element.label === name) {
          return {
            ...element,
            text: value,
          };
        } else if (`${element.label}price` === name) {
          return {
            ...element,
            price: value,
          };
        } else {
          return {
            ...element,
          };
        }
      });
    });
  }
  function handleOnSubmit(e) {
    e.preventDefault();
    console.log('dane wysłane');
    
    const { value, name, cat } = e.target;
    setFormValues(currentData);
    
  }

  return (
    <>
      <Form onSubmit={handleOnSubmit}>
        {formValues.map((option, i) => {
          return (
            <>
              {option.label !== '$' && (
                <Row key={i} className=' align-items-center m-2'>
                  <InputGroup
                    xs='auto '
                    size='md'
                    md='4'
                    className='form-group'
                  >
                    <InputGroup.Text className='form-option-label'>
                      {option.label}
                    </InputGroup.Text>
                    <Form.Control
                      type='text'
                      name={option.label}
                      value={option.text}
                      onChange={handleOnInputsChange}
                    />
                    {isChecked && category !== 'monitor' && (
                      <>
                        <InputGroup.Text className='form-dollar'>
                          $
                        </InputGroup.Text>
                        <Form.Control
                          name={`${option.label}price`}
                          value={option.price}
                          onChange={handleOnInputsChange}
                          className='form-price-label'
                          type='number'
                        />
                      </>
                    )}
                  </InputGroup>
                </Row>
              )}
              {(!isChecked || category === 'monitor') && option.label === '$' && (
                <Row key={i} xs='auto' className='my-3  justify-content-center'>
                  <InputGroup.Text className='form-dollar'>
                    {option.label}
                  </InputGroup.Text>
                  <Form.Control
                    className='form-price-label'
                    value={option.price}
                    type='number'
                    onChange={handleOnInputsChange}
                    name={`${option.label}price`}
                  />
                </Row>
              )}
            </>
          );
        })}
        <Row xs='auto' className='my-3  justify-content-center'>
          <Col>
            <Button className='p-2 m-2' variant='primary' type='submit'>
              Submit
            </Button>
          </Col>
        </Row>{' '}
      </Form>
    </>
  );
}

export default FormElement;
