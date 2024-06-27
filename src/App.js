// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PlaceList from './components/PlaceList';
import PlaceDetails from './components/PlaceDetails';
import UserForm from './components/UserForm';
import AddPlace from './components/AddPlace';
import Locations from './components/Locations';
import Users from './components/Users';

const App = () => {
  

  return (
    <Router>
      <nav className="bg-blue-500 p-4">
        <ul className="flex space-x-4 text-white">
          <li><Link to="/" className="hover:underline">Home</Link></li>
          <li><Link to="/addplace" className="hover:underline">Add Place</Link></li>
          <li><Link to="/user" className="hover:underline">User Form</Link></li>
          <li><Link to="/locations" className="hover:underline">Locations</Link></li>
        </ul>
      </nav>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<PlaceList />} />
          <Route path="/place/:id" element={<PlaceDetails />} />
          <Route path="/addplace" element={<AddPlace />} />
          <Route path="/user" element={<Users />} />
          <Route path="/locations" element={<Locations />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
