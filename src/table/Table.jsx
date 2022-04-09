import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useReRenderFlagCall } from '../context/context';
import TableElement from './TableElement';

function Table() {
  const [result, setResult] = useState(null);

  const renderingFlag = useReRenderFlagCall();
  // fetching data from the form rendering each time after submit 
  useEffect(() => {
    axios
      .get('/save')
      .then((response) => {
        const data = response.data;
        console.log(data);
        console.log('Data to draw has been recieved');
        setResult(data);
      })
      .catch(() => {
        console.log('Some error occured');
      });
  }, [renderingFlag]);

  console.log(result);
  return (
    <div>
      <TableElement dataToShow={result} />
      {/* {result &&
        result.map((item) => {
          console.log(Object.values(item));
          return (
            <>
              <h2>{Object.keys(item)}</h2>
              {Object.values(item).map((element) => {
                console.log(element);
                return (
                  <h4>
                    {element.map((i) => (
                      <>
                        <h4>{i.label}</h4>
                        <h5>{i.text}</h5>
                        <h6>{i.price}</h6>
                      </>
                    ))}
                  </h4>
                );
              })}
            </>
          );
        })} */}
    </div>
  );
}

export default Table;
