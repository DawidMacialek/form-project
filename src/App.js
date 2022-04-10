import './App.css';
import Forms from './form/Forms';
import Table from './table/Table';

import { ReRenderProvider } from './context/context';


function App() {

  
  return (
    <div className='app'>
      <ReRenderProvider>
        <Forms />
        <Table />
      </ReRenderProvider>
    </div>
  );
}

export default App;
