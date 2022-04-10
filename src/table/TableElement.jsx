import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Spinner } from 'react-bootstrap';
import { useReRenderFlagCall } from '../context/context.js';

function TableElement({ dataToShow }) {
  const [upToDateData, setUpToDateData] = useState(dataToShow);
  const renderComponentCall = useReRenderFlagCall();
  useEffect(() => {
    setUpToDateData(dataToShow);
  }, [dataToShow]);

  function countTotalPrice(element) {
    let total = element.reduce((a, b) => ({
      price: Number(a.price) + Number(b.price),
    }));
    return total.price;
  }
  function countTotalCosts(element) {
    let helperArr = [];
    console.log(element);
    if (element !== null && element.length > 0) {
      element.forEach((item) => {
        Object.values(item)[0].forEach((item) => {
          if (item.price) {
            helperArr.push(Number(item.price));
          }
        });
      });
      return helperArr.reduce(function (a, b) {
        return a + b;
      }, 0);
    } else {
      return '0';
    }
  }
  function handleOnClickDeleteCategory(e) {
    const dataset = e.target.dataset.index;
    const filtredTable = upToDateData.filter((item, index) => {
      if (Object.keys(item) + index === dataset) {
        return false;
      } else {
        return true;
      }
    });
    axios({
      url: '/update',
      method: 'POST',
      data: filtredTable,
    })
      .then(() => {
        console.log('Data has been update to the server');
      })
      .catch(() => {
        console.log('Internal server error');
      });
    renderComponentCall();
  }
  return (
    <div className='table-container'>
      <Table striped bordered hover size='sm' responsive='sm'>
        {upToDateData ? (
          upToDateData.map((item, index) => {
            const category = Object.keys(item)[0];
            let compFlag = null;
            if (category === 'monitor' || category === 'laptop') {
              compFlag = true;
            } else {
              compFlag = false;
            }
            return (
              <>
                <thead>
                  <tr>
                    <th className='category-heading' colSpan={2}>
                      {category}
                    </th>
                    <th>Details</th>
                    <th>
                      <div
                        data-index={`${category}${index}`}
                        className='delete-btn'
                        onClick={handleOnClickDeleteCategory}
                      >
                        X
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.values(item).map((element) => {
                    return (
                      <>
                        {element.map((item, index) => {
                          return (
                            <>
                              <tr>
                                {compFlag && item.label !== '$' ? (
                                  <>
                                    <td className='item-index'>{index + 1}</td>
                                    <td className='item-label'>{item.label}</td>
                                    <td colSpan={12} className='item-text'>
                                      {item.text}
                                    </td>
                                  </>
                                ) : (
                                  <td colSpan={12} className='item-price'>
                                    {item.label !== '$'
                                      ? ''
                                      : `TOTAL PRICE: $ ${item.price}`}
                                  </td>
                                )}
                              </tr>
                              {!compFlag && (
                                <tr>
                                  <td className='item-index'>{index + 1}</td>
                                  <td className='item-label'>{item.label}</td>
                                  <td className='item-text'>{item.text}</td>
                                  <td className='item-price'>$ {item.price}</td>
                                </tr>
                              )}
                            </>
                          );
                        })}
                        {!compFlag && (
                          <tr>
                            <td className='total-price' colSpan={12}>
                              Total price: ${' '}
                              <span className='total-price-span'>
                                {countTotalPrice(element)}
                              </span>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </>
            );
          })
        ) : (
          <Spinner animation='border' />
        )}
      </Table>
      <div className='total-costs'>
        Total costs: $ {countTotalCosts(upToDateData)}
      </div>
    </div>
  );
}

export default TableElement;
