import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeUserThunk } from '../../reducers/index';
import { removeSchoolThunk } from '../../reducers/index';

/* -----------------    COMPONENT     ------------------ */

class UserIcon extends React.Component {

  constructor (props) {
    super(props);
    this.removeUserCallback = this.removeUserCallback.bind(this);
  }


  render () {
    const { user, schools } = this.props;
    const userSchool = schools.filter(school => (school.id === user.schoolId));
    return (
      <div className="list-group-item min-content user-item">
        <div className="media">
          <div className="media-left media-middle icon-container">
            <img className="media-object img-circle" src={user.photo} />
          </div>
          <NavLink
            className="media-body"
            activeClassName="active"
            to={`/users/${user.id}`}>
            <h4 className="media-heading tucked">
              <span placeholder="Jean Doe">{user.name}</span>
            </h4>
            <h5 className="tucked">
              <span>{user.email}</span>
            </h5>
            <h5 className="tucked">{ userSchool.length &&
              <span>{userSchool[0].name}</span>}
            </h5>
          </NavLink>
          <div className="media-right media-middle">
            <button
                className="btn btn-default"
                onClick={this.removeUserCallback}>
              <span className="glyphicon glyphicon-remove" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  removeUserCallback (event) {
    const { removeUserThunk, removeSchoolThunk, user, school } = this.props;
    event.stopPropagation();
    removeUserThunk(user.id);
    this.props.history.push('/');
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapPropsToState = ({users, schools}, ownProps) => ({user: ownProps.user, schools : schools});

const mapDispatchToProps = { removeUserThunk, removeSchoolThunk };

export default connect(mapPropsToState, mapDispatchToProps)(UserIcon);

// export default UserIcon
