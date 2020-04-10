import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CategoryForm from './CategoryForm';
import CategoryFeed from './CategoryFeed';
import Spinner from '../common/Spinner';
import { getCategorys } from '../../actions/categoryActions';

class Categorys extends Component {
  componentDidMount() {
    this.props.getCategorys();
  }

  render() {
    const { categorys, loading } = this.props.category;
    let categoryContent;

    if (categorys === null || loading) {
      categoryContent = <Spinner />;
    } else {
      categoryContent = <CategoryFeed categorys={categorys} />;
    }

    return (
      <div className="feed">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <CategoryForm />
              {categoryContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Categorys.propTypes = {
  getCategorys: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  category: state.category
});

export default connect(mapStateToProps, { getCategorys })(Categorys);
