import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import SchoolIcon from './Schools/SchoolIcon';
import {addSchool} from '../reducers/index'

/* -----------------    COMPONENT     ------------------ */

class SchoolList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
    };

    this.filterSchool = this.filterSchool.bind(this);
    this.renderSchoolSearch = this.renderSchoolSearch.bind(this);
    this.renderNewSchoolWidget = this.renderNewSchoolWidget.bind(this);
    this.submit = this.submit.bind(this);
  }

  render() {
    return (
      <div className="container">
        <div className="user-query">
          { this.renderSchoolSearch() }
          { this.renderNewSchoolWidget() }
        </div>
        <br />
        <br />
        <div className="user-list">
        {
          this.props.schools
            .filter(this.filterSchool)
            .map(school => <SchoolIcon school={school} key={school.id} />)
        }
        </div>
      </div>
    );
  }

  renderSchoolSearch() {
    return (
      <div className="list-group-item min-content user-item">
        <div className="media">
          <div className="media-left media-middle icon-container">
            <span className="glyphicon glyphicon-search" />
          </div>
          <div className="media-body">
            <h4 className="media-heading tucked">
              <input
                type="text"
                placeholder="Search University/School"
                className="form-like"
                onChange={evt => this.setState({ name: evt.target.value })}
              />
            </h4>

          </div>
        </div>
      </div>
    );
  }

  filterSchool(schools) {
    const nameMatch  = new RegExp(this.state.name, 'i');

    return nameMatch.test(schools.name)
  }


  renderNewSchoolWidget() {
    return (
      <div className="list-group-item min-content user-item">
        <form className="media" onSubmit={this.submit}>
          <div className="media-left media-middle icon-container">
            <button
              type="submit"
              className="glyphicon glyphicon-plus clickable"
            />
          </div>
          <div className="media-body">
            <h4 className="media-heading tucked">
              <input
                name="name"
                type="text"
                required
                placeholder="New University/School"
                className="form-like"
              />
            </h4>
            <h5 className="tucked">
              <input
                name="image"
                type="text"
                placeholder="URL for display image"
                className="form-like"
              />
            </h5>
          </div>
        </form>
      </div>
    );
  }

  submit(event) {
    event.preventDefault();
    const school = {
      name: event.target.name.value,
      image: event.target.image.value
    };
    console.log(school);
    this.props.addSchool(school);
    // clear the inputs
    event.target.name.value = '';
    event.target.image.value = '';
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ schools }, ownProps) => ({ schools, ownProps });

const mapDispatchToProps = { addSchool };

export default connect(mapStateToProps, mapDispatchToProps)(SchoolList);

