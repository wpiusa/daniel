import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteCategory, } from '../../actions/categoryActions';

class CategoryItem extends Component {
  onDeleteClick(id) {
    this.props.deleteCategory(id);
  }
 
  render() {
    const { category } = this.props;

    return (
      <div className="card card-body mb-3">
        <div className="row">
          <div className="col-md-2">
           
            <p className="text-center">{category.category}</p>
          </div>
          <div className="col-md-10">
           
            
              <span>
                                
                  <button
                    onClick={this.onDeleteClick.bind(this, category._id)}
                    type="button"
                    className="btn btn-danger mr-1"
                  >
                    <i className="fas fa-times" />
                  </button>
                
              </span>
           
          </div>
        </div>
      </div>
    );
  }
}

CategoryItem.defaultProps = {
  showActions: true
};

CategoryItem.propTypes = {
  deleteCategory: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteCategory })(
  CategoryItem
);
