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

        console.log('Data to draw has been recieved');
        setResult(data);
      })
      .catch(() => {
        console.log('Some error occured');
      });
  }, [renderingFlag]);

  return (
    <div>
      <TableElement dataToShow={result} />
    </div>
  );
}

export default Table;
