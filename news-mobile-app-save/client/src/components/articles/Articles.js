import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ArticleItem from './ArticleItem';
import { getArticles } from '../../actions/articleActions';

class Articles extends Component {
  componentDidMount() {
    this.props.getArticles();
  }

  render() {
    const { articles, loading } = this.props.article;
    let articleItems;

    if (articles === null || loading) {
      articleItems = <Spinner />;
    } else {
      if (articles.length > 0) {
        articleItems = articles.map(article => (
          <ArticleItem key={article._id} article={article} />
        ));
      } else {
        articleItems = <h4>No articles found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Articles</h1>
              
              {articleItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Articles.propTypes = {
  getArticles: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  article: state.article
});

export default connect(mapStateToProps, { getArticles })(Articles);
