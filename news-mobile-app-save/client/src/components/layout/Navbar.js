import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/authActions';
import { clearCurrentArticle } from '../../actions/articleActions';
import { getOrgs } from '../../actions/orgActions';

class Navbar extends Component {
  onLogoutClick(e) {
    e.preventDefault();
    this.props.clearCurrentArticle();
    this.props.logoutUser();
  }
  
  state ={
    hideOrg:true
  }

  componentDidMount() {
    this.props.getOrgs();
  }
 
  render() {
    const { isAuthenticated, user } = this.props.auth;
    const { orgs } = this.props.org;
    console.log(orgs)
    const authLinks = (
     <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/feed">
            Category
          </Link>
        </li>

        <li className="nav-item">
          <Link className="nav-link"  to= "/create-org">
                New Org
          </Link>
        </li>     
              
        <li className="nav-item">
          <Link className="nav-link"  to="/dashboard">
            The Informer
          </Link>
        </li>
        <li className="nav-item">
          <a
            href=""
            onClick={this.onLogoutClick.bind(this)}
            className="nav-link"
          >
            <img
              className="rounded-circle"
              src={user.avatar}
              alt={user.name}
              style={{ width: '25px', marginRight: '5px' }}
              title="You must have a Gravatar connected to your email to display an image"
            />{' '}
            Logout
          </a>
        </li>
      </ul>
    );

    const guestLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/register">
            Sign Up
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">
            Login
          </Link>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            The Informer
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/articles">
                  {' '}
                  Articles
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/orgs">
                  {' '}
                  Edit Org
                </Link>
              </li>
              
            </ul>
            {isAuthenticated ? authLinks : guestLinks}
          </div>
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  org: state.org,
});

export default connect(mapStateToProps, { logoutUser, clearCurrentArticle,getOrgs })(
  Navbar
);
