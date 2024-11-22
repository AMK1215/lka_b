import React, { useContext } from 'react'
import { Dropdown } from 'react-bootstrap'
import myanmar from '../assets/img/mm.png'
import english from '../assets/img/en.png'
import { AuthContext } from '../contexts/AuthContext'

const LanguageDropdown = () => {
  const { lan, updateLanguage } = useContext(AuthContext);

  return (
    <Dropdown>
    <Dropdown.Toggle className='border-0 px-1 px-lg-2' style={{background:'#3C0646'}}  id="dropdown-basic">
        <img src={lan === "en" ? english : myanmar} className='flag' />
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item className='d-flex align-items-center gap-2' onClick={() => updateLanguage('mm')}>
      <img src={myanmar} className='flag' />
      <p>မြန်မာ</p>
      </Dropdown.Item>
      <Dropdown.Item className='d-flex align-items-center gap-2' onClick={() => updateLanguage('en')}>
      <img src={english} className='flag' />
      <p>Eng</p>
       </Dropdown.Item>
      
    </Dropdown.Menu>
  </Dropdown>
  )
}

export default LanguageDropdown
