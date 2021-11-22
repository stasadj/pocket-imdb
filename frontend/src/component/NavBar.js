import React from 'react';

import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../store/selectors/AuthSelectors';
import { logOut } from '../store/actions/AuthActions';

import { useTranslation } from 'react-i18next';

import { LOGIN, REGISTER, HOME, ABOUT } from '../routes/routes';

const NavBar = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <NavLink className="navbar-brand" to={HOME}>
          PocketIMDB
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavLink className="nav-link" to={HOME}>
              {t('Home')}
            </NavLink>
            <NavLink className="nav-link" to={ABOUT}>
              {t('About app')}
            </NavLink>
          </Nav>
        </Navbar.Collapse>
        <Button variant="light" onClick={() => i18n.changeLanguage('srb')}>
          SR
        </Button>
        |
        <Button variant="light" onClick={() => i18n.changeLanguage('en')}>
          EN
        </Button>
        {isLoggedIn && (
          <Button variant="success" type="submit" onClick={handleLogout}>
            {t('Log out')}
          </Button>
        )}
        {!isLoggedIn && (
          <Button variant="success" className="mx-1" onClick={() => navigate(LOGIN)}>
            {t('Log in')}
          </Button>
        )}
        {!isLoggedIn && (
          <Button variant="outline-success" onClick={() => navigate(REGISTER)}>
            {t('Register')}
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
