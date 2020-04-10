import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import { editOrg,getOrgs  } from '../../actions/orgActions';

class CreateOrg extends Component {
  constructor(props) {
    super(props);
    this.state = {
      org: '',
      orgimg:'',
      about1:'',
      about2:'',
      about3:'',
      support1:'',
      support2:'',
      support3:'',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getOrgs();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.org.org) {
      const org = nextProps.org.org;

      
      // Set component fields state
      this.setState({
        org: org.org,
        orgimg : org.orgimg,
        about1 : org.about1,
        about2 : org.about2,
        about3 : org.about3,
        support1 : org.support1,
        support2 : org.support2,
        support3 : org.support3,
      
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const orgData = {
      org: this.state.org,
      orgimg : this.state.orgimg,
      about1 : this.state.about1,
      about2 : this.state.about2,
      about3 : this.state.about3,
      support1 : this.state.support1,
      support2 : this.state.support2,
      support3 : this.state.support3,
 
    };

    this.props.editOrg(orgData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Org</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
              <TextFieldGroup
                  placeholder="* Organization Name"
                  name="org"
                  value={this.state.org}
                  onChange={this.onChange}
                  error={errors.org}
                  info="Organization Name"
                />
                <TextFieldGroup
                  placeholder="* Image URL for organization"
                  name="orgimg"
                  value={this.state.orgimg}
                  onChange={this.onChange}
                  error={errors.orgimg}
                  info="Image URL for organization"
                />
                <TextFieldGroup
                  placeholder="* About the organization"
                  name="about1"
                  value={this.state.about1}
                  onChange={this.onChange}
                  error={errors.about1}
                  info="About the organization"
                />
                <TextFieldGroup
                  placeholder=""
                  name="about2"
                  value={this.state.about2}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder=""
                  name="about3"
                  value={this.state.about3}
                  onChange={this.onChange}
                />
                <TextFieldGroup
                  placeholder="* Support organization"
                  name="support1"
                  value={this.state.support1}
                  onChange={this.onChange}
                  error={errors.support1}
                  info="Support organization"
                />
                <TextFieldGroup
                  placeholder=""
                  name="support2"
                  value={this.state.support2}
                  onChange={this.onChange}
                  error={errors.support2}
                />
                <TextFieldGroup
                  placeholder=""
                  name="support3"
                  value={this.state.support3}
                  onChange={this.onChange}
                  error={errors.support3}
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

CreateOrg.propTypes = {
  editOrg: PropTypes.func.isRequired,
  getCurrentOrg: PropTypes.func.isRequired,
  org: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  org: state.org,
  errors: state.errors
});

export default connect(mapStateToProps, { editOrg, getOrgs })(
  withRouter(CreateOrg)
);
