import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, InputGroup } from 'react-bootstrap';
import { useReRenderFlagCall } from '../context/context.js';

function FormElement({ category, currentData, isChecked }) {
  const [formValues, setFormValues] = useState(currentData);
  const renderComponentCall = useReRenderFlagCall();

  useEffect(() => {
    setFormValues(currentData);
  }, [currentData]);
  function resetInputValues() {
    setFormValues(currentData);
  }
  function handleOnInputsChange(e) {
    e.preventDefault();
    const { value, name } = e.target;

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
    let categoryName = null;
    if (category === 'computer' && isChecked) {
      categoryName = 'pc';
    } else if (category === 'computer' && !isChecked) {
      categoryName = 'laptop';
    } else {
      categoryName = category;
    }
    const dataToSend = {
      [categoryName]: [...formValues],
    };

    axios({
      url: '/send',
      method: 'POST',
      data: dataToSend,
    })
      .then(() => {
        console.log('Data has been sent to the server');
      })
      .catch(() => {
        console.log('Internal server error');
      });
    resetInputValues();
    renderComponentCall();
  }
  function addAdditionalItem() {
    let helperArr = [];
    if (formValues.length < currentData.length + 3) {
      formValues.forEach((item, index) => {
        if ((category === 'computer' && !isChecked) || category === 'monitor') {
          if (index === formValues.length - 2) {
            helperArr = [
              ...helperArr,
              item,
              { label: `component ${index + 2}`, text: '', price: 0 },
            ];
          } else {
            helperArr.push(item);
          }
          setFormValues([...helperArr]);
        } else {
          const otherLabel =
            category === 'computer'
              ? `component ${index + 2}`
              : `item ${index + 2}`;
          setFormValues([
            ...formValues,
            { label: otherLabel, text: '', price: 0 },
          ]);
        }
      });
    } else {
      alert(
        'Maximum number of added new items has been reached. Please, use "other" category if you would like to add more items.'
      );
      return false;
    }
  }
  return (
    <>
      <Form onSubmit={handleOnSubmit} className='form'>
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
            <Button
              onClick={addAdditionalItem}
              className='p-2 m-2 add-item-btn'
              variant='light'
            >
              Add additional item
            </Button>
          </Col>
          <Col>
            <Button
              className='p-2 m-2 submit-item-btn'
              variant='primary'
              type='submit'
            >
              Submit
            </Button>
          </Col>
        </Row>{' '}
      </Form>
    </>
  );
}

export default FormElement;
