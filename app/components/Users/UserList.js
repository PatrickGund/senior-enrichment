import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addUser } from '../../reducers/index';
import UserIcon from './UserIcon';

/* -----------------    COMPONENT     ------------------ */

class UserList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      school: ''
    };

    console.log('UserListProps', this.props);


    this.filterUser = this.filterUser.bind(this);
    this.renderUserSearch = this.renderUserSearch.bind(this);
    this.renderNewUserWidget = this.renderNewUserWidget.bind(this);
    this.submit = this.submit.bind(this);
  }

  render() {
    return (
      <div className="container">
        <div className="user-query">
          { this.renderUserSearch() }
          { this.renderNewUserWidget() }
        </div>
        <br />
        <br />
        <div className="user-list">
        {
          this.props.users
            .filter(this.filterUser)
            .map(user => <UserIcon user={user} key={user.id} />)
        }
        </div>
      </div>
    );
  }

  renderUserSearch() {
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
                placeholder="Student Name"
                className="form-like"
                onChange={evt => this.setState({ name: evt.target.value })}
              />
            </h4>
            <h5 className="tucked">
              <input
                 type="email"
                 placeholder="email@website.com"
                 className="form-like"
                 onChange={evt => this.setState({ email: evt.target.value })}
              />
            </h5>
            <h5 className ="tucked">
              <select className ="form-control" name="selectSchool" onChange={evt => this.setState({ school: evt.target.value })}> 
                <option value="" disabled selected hidden>Search by School</option>
                {this.props.schools.map(school=> (<option key={school.id} value={school.id}>{school.name} id: {school.id}</option>))}
              </select>
            </h5>
          </div>
        </div>
      </div>
    );
  }

  filterUser(users) {
    const nameMatch  = new RegExp(this.state.name, 'i');
    const emailMatch = new RegExp(this.state.email, 'i');
    const schoolMatch = new RegExp(this.state.school, 'i');

    return nameMatch.test(users.name)
        && emailMatch.test(users.email)
        && schoolMatch.test(users.schoolId);
  }


  renderNewUserWidget() {
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
                placeholder="Jean Doe"
                className="form-like"
              />
            </h4>
            <h5 className="tucked">
              <input
                name="email"
                type="email"
                required
                placeholder="email@website.com"
                className="form-like"
              />
            </h5>
              <h5 className="tucked">
              <select className ="form-control" name="school" placeholder="email@website.com"> 
                <option value="" disabled selected hidden>Add to School</option>
                {this.props.schools.map(school=> (<option key={school.id} value={school.id}>{school.name} id: {school.id}</option>))}
              </select>
            </h5>
          </div>
        </form>
      </div>
    );
  }

  submit(event) {
    event.preventDefault();
    const user = {
      name: event.target.name.value,
      email: event.target.email.value,
      schoolId: event.target.school.value,
    };
    this.props.addUser(user);
    // clear the inputs
    event.target.name.value = '';
    event.target.email.value = '';
    event.target.school.value = '';
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapPropsToState = ({ users, schools }) => ({ users, schools });

const mapDispatchToProps = { addUser };

export default connect(mapPropsToState, mapDispatchToProps)(UserList);

