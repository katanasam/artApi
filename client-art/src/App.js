//! Router changement de page
import { BrowserRouter as Router ,Route} from 'react-router-dom'

import {Container } from  'semantic-ui-react'

// lordre est important
import 'semantic-ui-css/semantic.min.css'
import './App.css';

  

//! le Router contien des Routes
//* Router [ Route ] 


//! imporataion des MENU BAR ET FOOTER
import MenuBar from './components/MenuBar'

//! importation des PAGES
import Home from './pages/common/Home'
import Login from './pages/common/Login'
import Register from './pages/common/Register'


function App() {
  return (
<Container>
<Router>
     {/* le menue sera present sur chaque une des pages */}
     <MenuBar/> 

    {/* chaque route envoie vers une page */}
    <Route exact path='/' component={Home}/>
    <Route exact path="/login" component={Login}/>
    <Route exact path="/register" component={Register}/>
   
   </Router>
</Container>

  );
}



//! APP envoyer dans le apolloProvider 
//! APP -> ApolloProvider -> index.js -> plublic/index
export default App;
