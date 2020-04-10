import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import OrgHeader from './OrgHeader';
import Spinner from '../common/Spinner';
import { getOrgByOrg} from '../../actions/orgActions';

class Org extends Component {
  componentDidMount() {
    if (this.props.match.params.org) {
      this.props.getOrgByOrg(this.props.match.params.org);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.org.org === null && this.props.org.loading) {
      this.props.history.push('/not-found');
    }
  }


  render() {
    const { org, loading } = this.props.org;
    let orgContent;

    if (org === null || loading) {
      orgContent = <Spinner />;
    } else {
      orgContent = (
        <div>
          <div className="row">
            <div className="col-md-6">
              <Link to="/orgs" className="btn btn-light mb-3 float-left">
                Back To Articles
              </Link>
              
              <Link to="/edit-org" className="btn btn-light mb-3 float-left">
                Edit Org
              </Link>

            </div>
            <div className="col-md-6" />
          </div>
          <OrgHeader org={org} />
                    
        </div>
      );
    }

    return (
      <div className="profile">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{orgContent}</div>
            
          </div>
        </div>
      </div>
    );
  }
}

Org.propTypes = {
  getOrgByOrg: PropTypes.func.isRequired,
  org: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  org: state.org
});

export default connect(mapStateToProps, { getOrgByOrg})(Org);
