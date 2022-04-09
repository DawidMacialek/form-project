import React from 'react';
import { Table } from 'react-bootstrap';
import { BsFillFileXFill } from 'react-icons/bs';

function TableElement({ dataToShow }) {
  function countTotalPrice(price) {
    const total = price.reduce((a, b) => Number(a.price) + Number(b.price));
    return total;
  }

  return (
    <div className='table-container'>
      <Table striped bordered hover size='sm' responsive='sm'>
        {/* <thead>
          <tr className='table-header'>
            <th>Category</th>
            <th>Name of part</th>
            <th>Details</th>
            <th>Price</th>
          </tr>
        </thead> */}
        {dataToShow
          ? dataToShow.map((item) => {
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

                      <th className='delete-btn'>
                        <BsFillFileXFill />
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {Object.values(item).map((element, index) => {
                      return (
                        <>
                          {element.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td className='item-index'>
                                  {item.label === '$' ? '' : index + 1}
                                </td>
                                <td className='item-label'>
                                  {item.label === '$' ? '' : item.label}
                                </td>
                                <td className='item-text'>{item.text}</td>
                                {compFlag ? (
                                  <td className='item-price'>
                                    {item.label !== '$'
                                      ? ''
                                      : `TOTAL PRICE: $ ${item.price}`}
                                  </td>
                                ) : (
                                  <td className='item-price'>$ {item.price}</td>
                                )}
                              </tr>
                            );
                          })}
                          {!compFlag && (
                            <tr>
                              <td>Total: $ {countTotalPrice(element)}</td>
                            </tr>
                          )}
                        </>
                      );
                    })}
                  </tbody>
                </>
              );
            })
          : ''}
      </Table>
    </div>
  );
}

export default TableElement;
