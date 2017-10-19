import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import UserIcon from './UserIcon';
import SchoolIcon from '../Schools/SchoolIcon';
import { updateUserThunk } from '../../reducers/index';

/* -----------------    COMPONENT     ------------------ */

class UserDetail extends React.Component {

  constructor(props) {
    super(props);
    this.state ={
      newName: "",
      newEmail: "",
      newSchool: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit (evt) {
    evt.preventDefault();

    const ID = this.props.userID;
    console.log(ID, typeof ID)

    if(evt.target.name.value  === ""){evt.target.name.value = this.props.users.filter(user=> user.id === ID)[0].name}
    if(evt.target.email.value === ""){evt.target.email.value = this.props.users.filter(user=> user.id === ID)[0].email}
    if(evt.target.selectSchool.value === ""){evt.target.name.selectSchool = this.props.users.filter(user=> user.id === ID)[0].schoolId}
    const data = {
      name: evt.target.name.value,
      email: evt.target.email.value,
      schoolId: evt.target.selectSchool.value
    }

    console.log(data);

    this.props.updateUserThunk( ''+ID , data );

    evt.target.name.value         = "";
    evt.target.email.value        = "";
    evt.target.selectSchool.value = "";


  }

  render() {
    console.log(this.state);
    const { users, schools, userID} = this.props;
    const user = users.filter(user => (user.id === userID));
    if (!user) return <div />  // the user id is invalid or data isn't loaded yet
    return (
      <div className="container">
        {user.length ? <UserIcon user={user[0]} key={user[0].id} /> : this.props.history.push('/')}
        <div className="panel panel-warning">
          <div className="panel-heading">
            <h2 className="panel-title large-font">Edit Fields : Must input all values to update student</h2>
          </div>
          <ul className="list-group">
            <form className="list-group-item story-item" onSubmit={this.handleSubmit}>
              <input
                name="name"
                type="text"
                className="form-like"
                required
                placeholder="Change Name"
                onChange={evt => this.setState({ newName: evt.target.value })}
              />
              <input
                name="email"
                type="text"
                className="form-like"
                required
                placeholder="Change Email Address"
                onChange={evt => this.setState({ newEmail: evt.target.value })}
              />

              <select className ="form-control" name="selectSchool" onChange={evt => this.setState({ newSchool: evt.target.value })}> 
                <option value="" disabled selected hidden>Change School</option>
                {schools.map(school=> (<option key={school.id} value={school.id}>{school.name} id: {school.id}</option>))}
              </select>

              <button type="submit" className="btn btn-warning btn-xs">
                <span className="glyphicon glyphicon-wrench" />
              </button>
            </form>
            {
              schools
              .filter(school => school.id === user.schoolId)
              .map(school => <div school={school} key={school.id}>{school.name}</div>)
            }
          </ul>
          <div className="panel-heading">
            <h2 className="panel-title large-font">Current School/University</h2>
          </div>
          {(schools.length) ? <SchoolIcon school={schools.filter(school => (user[0].schoolId === school.id))[0]} /> : <div/>}
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
    userID: paramId
  };
};

const mapDispatch =  {updateUserThunk};

export default connect(mapState, mapDispatch)(UserDetail);
