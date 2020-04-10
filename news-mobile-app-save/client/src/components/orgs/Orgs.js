import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import OrgItem from './OrgItem';
import { getOrgs } from '../../actions/orgActions';

class Orgs extends Component {
  componentDidMount() {
    this.props.getOrgs();
  }

  render() {
    const { orgs, loading } = this.props.org;
    let orgItems;

    if (orgs === null || loading) {
      orgItems = <Spinner />;
    } else {
      if (orgs.length > 0) {
        orgItems = orgs.map(org => (
          <OrgItem key={org._id} org={org} />
        ));
      } else {
        orgItems = <h4>No articles found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Organization</h1>
                 {orgItems}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Orgs.propTypes = {
  getOrgs: PropTypes.func.isRequired,
  org: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  org: state.org
});

export default connect(mapStateToProps, { getOrgs })(Orgs);
