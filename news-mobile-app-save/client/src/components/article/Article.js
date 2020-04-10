import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ArticleHeader from './ArticleHeader';
import Spinner from '../common/Spinner';
import { getArticleByTitle,deleteArticle } from '../../actions/articleActions';

class Article extends Component {
  componentDidMount() {
    if (this.props.match.params.title) {
      this.props.getArticleByTitle(this.props.match.params.title);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.article.article === null && this.props.article.loading) {
      this.props.history.push('/not-found');
    }
  }

  onDeleteClick(id) {
    this.props.deleteArticle(id);
  }

  render() {
    const { article, loading } = this.props.article;
    let articleContent;

    if (article === null || loading) {
      articleContent = <Spinner />;
    } else {
      articleContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/articles" className="btn btn-light mb-3 float-left">
                Back To Articles
              </Link>
              <Link 
                to="/articles" 
                className="btn btn-light mb-3 float-left"
                onClick={this.onDeleteClick.bind(this,article._id)}
                >
                Delete Article
              </Link>
              <Link to="/edit-article" className="btn btn-light mb-3 float-left">
                Edit Article
              </Link>

            </div>
            <div className="col-md-6" />
          </div>
          <ArticleHeader article={article} />
                    
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{articleContent}</div>
            
          </div>
        </div>
      </div>
    );
  }
}

Article.propTypes = {
  getArticleByTitle: PropTypes.func.isRequired,
  article: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  article: state.article
});

export default connect(mapStateToProps, { getArticleByTitle,deleteArticle })(Article);
