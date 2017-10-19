import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUser } from '../../reducers/index';
import UserIcon from '../Users/UserIcon';
import SchoolIcon from './SchoolIcon';
import {updateSchoolThunk} from '../../reducers/index';

/* -----------------    COMPONENT     ------------------ */

class SchoolDetail extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (evt) {
    console.log('in submit');

    const ID = this.props.schoolID;

    const data = {
      name: evt.target.name.value,
    }

    console.log('stuff', ID, data);

    this.props.updateSchoolThunk( ''+ID , data );

    evt.target.name.value         = "";

  }

  render() {
      
      const Id = this.props.schoolID
      const school = this.props.schools.filter(school => (school.id === Id))
    return (
      <div className="container">
        {(this.props.schools.length) ? <SchoolIcon school={school[0]} /> : <div/>}
          <div className="panel panel-warning">
            <div className="panel-heading">
              <h2 className="panel-title large-font">Edit Fields</h2>
            </div>
            <ul className="list-group">
              <form className="list-group-item story-item" onSubmit={this.handleSubmit}>
                <input
                  name="name"
                  type="text"
                  className="form-like"
                  required
                  placeholder="Change School Name"
                />

                <button type="submit" className="btn btn-warning btn-xs">
                  <span className="glyphicon glyphicon-wrench" />
                </button>
              </form>
            </ul>
          </div>

        <div className="panel panel-warning">
            <div className="panel-heading">
              <h2 className="panel-title large-font">Enrolled Students</h2>
            </div>
        </div>

        <div className="user-list">
        { 
          this.props.users.length && this.props.users.filter(user => user.schoolId === Id)
            .map(user => <UserIcon user={user} key={user.id} />)
        }
        </div>
      </div>
    );
  }
}


/* -----------------    CONTAINER     ------------------ */

const mapState = ({ users, schools }, ownProps) => {
  const paramId = Number(ownProps.match.params.id);
  return {
    schools: schools,
    users: users,
    schoolID: paramId
  };
};

const mapDispatch =  {updateSchoolThunk};

export default connect(mapState, mapDispatch)(SchoolDetail);