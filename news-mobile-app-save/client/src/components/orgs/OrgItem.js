import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class OrgItem extends Component {
  render() {
    const { org } = this.props;

    return (
      <div className="card card-body bg-light mb-3">
        <div className="row">
          
          <div className="col-lg-6 col-md-4 col-8">
            <h3>{org.org}</h3>
            <p>
              {org.orgimg}{' '}
            </p>
           
            <Link to={`/org/${org._id}`} className="btn btn-info">
              View Org
            </Link>


          </div>
          
        </div>
      </div>
    );
  }
}

OrgItem.propTypes = {
  org: PropTypes.object.isRequired
};

export default OrgItem;
