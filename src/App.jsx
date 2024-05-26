import React from 'react';
import A4page from './A4page.jsx'
import A4midpage from './A4midpage.jsx'
import A4endpage from './A4endpage.jsx'
import {Route, BrowserRouter,Routes} from 'react-router-dom';
import Signin from './component/Signin';
import Nopage from './component/Nopage';
import Signup from './component/Signup';
import Heropage from './component/Heropage.jsx';
import ImageGenerator from './component/ImageGenerator.jsx';
import Preview from './component/Preview.jsx';


export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Heropage/>}/>
          <Route path="/ai/signin" element={<Signup/>}/>
          <Route path="/ai/login" element={<Signin/>}/>
          <Route path="/ai/customizepage" element={<A4page/>}/>
          <Route path="/ai/customizemidpage" element={<A4midpage/>}/>
          <Route path="/ai/customizeendpage" element={<A4endpage/>}/>
          <Route path="/ai/error" element={<Nopage/>}/>
          <Route path="/ai/aigenerator" element={<ImageGenerator/>}/>
          <Route path="/ai/preview" element={<Preview/>}/>
        </Routes>
      </BrowserRouter>
    </div>
    // <A4page/>
    // <ImageGenerator/>
  )
}