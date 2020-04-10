import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';

class ArticleHeader extends Component {
  render() {
    const { article } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
           
            <div className="text-center">
              <h1 className="display-4 text-center">{article.category}</h1>
              <p className="lead text-center">
                {article.title}{' '}

                {isEmpty(article.author) ? null : (
                  <span>at {article.author}</span>
                )}
              </p>
              <p>
                {article.description}
              </p>
              {isEmpty(article.articleURL) ? null : <p>{article.articleURL}</p>}
              <p>
                {isEmpty(article.articleURL) ? null : (
                  <a
                    className="text-white p-2"
                    href={article.articleURL}
                    target="_blank"
                  >
                    <i className="fas fa-globe fa-2x" />
                  </a>
                )}

                
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ArticleHeader;
