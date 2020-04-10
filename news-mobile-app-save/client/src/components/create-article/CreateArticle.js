import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createArticle } from '../../actions/articleActions';
import { getCategorys } from '../../actions/categoryActions';

class CreateArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      description: '',
      author:'',
      headerimgURL: '',
      articleURL: '',
      category: '',
      
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCategorys();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  

  onSubmit(e) {
    e.preventDefault();

    const articleData = {
      title : this.state.title,
      description: this.state.description,
      author: this.state.author,
      headerimgURL: this.state.headerimgURL, 
      articleURL: this.state.articleURL,
      category: this.state.category,
    };
   
    this.props.createArticle(articleData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    const options = [{label:'Select the Category', value:0}];

    const { categorys } = this.props.category;
    if (categorys.length > 0) {
      
      categorys.map(cat => (
        options.push({label:cat.category, value:cat.category}) 
      ));
      
    } else {
      console.log('no categories')
    }

      
    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Article</h1>
              
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                
                <TextFieldGroup
                  placeholder="* Article Title"
                  name="title"
                  value={this.state.title}
                  onChange={this.onChange}
                  error={errors.title}
                  info="Article Title"
                />
                <TextFieldGroup
                  placeholder="* Article Short description"
                  name="description"
                  value={this.state.description}
                  onChange={this.onChange}
                  error={errors.description}
                  info="Article short description"
                />
                <SelectListGroup
                  placeholder="* Article Category"
                  name="category"
                  value={this.state.category}
                  onChange={this.onChange}
                  options={options}
                  error={errors.category}
                  info="Article Category"
                />
                <TextFieldGroup
                  placeholder="* Article Arthor"
                  name="author"
                  value={this.state.author}
                  onChange={this.onChange}
                  error={errors.author}
                  info="Article author"
                />
                <TextFieldGroup
                  placeholder="* Article header image URL "
                  name="headerimgURL"
                  value={this.state.headerimgURL}
                  onChange={this.onChange}
                  error={errors.headerimgURL}
                  info="Article header image URL"
                />
                <TextFieldGroup
                  placeholder="* Article URL"
                  name="articleURL"
                  value={this.state.articleURL}
                  onChange={this.onChange}
                  error={errors.articleURL}
                  info="Article URL"
                />
                 
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateArticle.propTypes = {
  article: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  
};

const mapStateToProps = state => ({
  article: state.article,
  category: state.category,
  errors: state.errors
});

export default connect(mapStateToProps, { createArticle,getCategorys })(
  withRouter(CreateArticle)
);
