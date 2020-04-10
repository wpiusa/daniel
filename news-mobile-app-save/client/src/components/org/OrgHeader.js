import React, { Component } from 'react';

class OrgHeader extends Component {
  render() {
    const { org } = this.props;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card card-body bg-info text-white mb-3">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                 {org.org}
              </div>
            </div>
            <div className="text-center">
              
              <p className="lead text-center">
                {org.orgimg}{' '}
               
              </p>
              {org.about1}
                         
              <p>
              {org.support1}               
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default OrgHeader;
