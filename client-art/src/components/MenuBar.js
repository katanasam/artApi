import React, { useState } from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from 'react-router-dom'

 function MenuBar() {

  // en fonction de lurl 
  const pathName = window.location.pathname;
  const path = pathName === '/' ? 'home' : pathName.substr(1); 

  const [activeItem, setActiveItem] = useState(path);

  //! a chaque click on récupere le name 
  // et on mais active sur le name corespondants
  const handleItemClick = (e, { name }) => setActiveItem(name);


    return (
      <div>
        <Menu pointing secondary size='massive'>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}
            to="/"
          />

          <Menu.Menu position='right'>

          <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />

          </Menu.Menu>
        </Menu>
      </div>
    )
  }


export default MenuBar;