import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentArticle } from '../../actions/articleActions';
import Spinner from '../common/Spinner';
//import ArticleActions from './ArticleActions';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentArticle();
  }

  onDeleteClick(e) {
    this.props.deleteAccount();
  }

  render() {
    const { user } = this.props.auth;
    const { article, loading } = this.props.article;

    let dashboardContent;

    if (article === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      
      if (Object.keys(article).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/article/${article.title}`}>{user.name}</Link>
            </p>
            <Link to="/create-article" className="btn btn-lg btn-info">
              Create Article
            </Link>            
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            
            <Link to="/create-article" className="btn btn-lg btn-info">
              Create Article
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentArticle: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  article: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  article: state.article,
  auth: state.auth
});

export default connect(mapStateToProps, { getCurrentArticle })(
  Dashboard
);
