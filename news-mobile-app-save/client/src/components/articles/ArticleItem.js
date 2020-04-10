import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class ArticleItem extends Component {
  render() {
    const { article } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
         
          <div className="col-lg-6 col-md-4 col-8">
            <p>
              {article.title}{' '}
            </p>
            <p>
              {isEmpty(article.author) ? null : (
                <span>{article.author}</span>
              )}
            </p>
            <Link to={`/article/${article._id}`} className="btn btn-info">
              View Article
            </Link>

          </div>
          <div className="col-md-4 d-none d-md-block">
            <h4>Category</h4>
            <ul className="list-group">
              <li className="list-group-item">
                <i className="fa fa-check pr-1" />
                  {article.category}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

ArticleItem.propTypes = {
  article: PropTypes.object.isRequired
};

export default ArticleItem;
