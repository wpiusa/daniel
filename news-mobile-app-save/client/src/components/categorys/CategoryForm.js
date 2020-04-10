import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addCategory } from '../../actions/categoryActions';

class CategoryForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category:'',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    const newCategory = {
      category: this.state.category,
    };

    this.props.addCategory(newCategory);
    this.setState({ text: '', category:'' });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Add Category...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
               
                <TextAreaFieldGroup
                  placeholder="Category"
                  name="category"
                  value={this.state.category}
                  onChange={this.onChange}
                  error={errors.category}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

CategoryForm.propTypes = {
  addCategory: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addCategory })(CategoryForm);
