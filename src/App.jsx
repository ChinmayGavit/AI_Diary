import React from 'react';
import A4pages from './A4pages.jsx'
import {Route, BrowserRouter,Routes} from 'react-router-dom';
import Signin from './component/Signin';
import Nopage from './component/Nopage';
import Signup from './component/Signup';
import Heropage from './component/Heropage.jsx';


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Heropage/>}/>
          <Route path="/create" element={<Nopage/>}/>
          <Route path="/signin" element={<Signup/>}/>
          <Route path="/login" element={<Signin/>}/>
          <Route path="/customizepage" element={<A4pages/>}/>
          <Route path="/ai" element={<Nopage/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    // <A4page/>
  )
}