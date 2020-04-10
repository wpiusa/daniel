import React, { Component } from 'react';
import PropTypes from 'prop-types';
import CategoryItem from './CategoryItem';

class CategoryFeed extends Component {
  render() {
    const { categorys } = this.props;

    return categorys.map(category => <CategoryItem key={category._id} category={category} />);
  }
}

CategoryFeed.propTypes = {
  categorys: PropTypes.array.isRequired
};

export default CategoryFeed;
