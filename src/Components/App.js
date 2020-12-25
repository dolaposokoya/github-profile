import React, { useEffect, useState } from 'react'
import Search from '../Components/Search/Search'


function App() {
  const [resourceType, setResourceType] = useState('search')

  useEffect(() => {
    // effect
    // return () => {
    //   cleanup
    // }
  }, [resourceType])

  return (
    <div className="container-fluid mt-5">
      <button type="button" onClick={() => setResourceType('search')} className="btn btn-light" style={{ margin: '10px' }}>Search</button>
      <button type="button" onClick={() => setResourceType('repository')} className="btn btn-light" style={{ margin: '5px' }}>All Users</button>
      <Search resourceType={resourceType} />
    </div>
  );
}

export default App;
