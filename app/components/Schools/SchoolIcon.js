import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeSchoolThunk } from '../../reducers/schools';
import { removeUserThunk } from '../../reducers/users';

/* -----------------    COMPONENT     ------------------ */

class SchoolIcon extends React.Component {

  constructor (props) {
    super(props);
    this.removeSchoolCallback = this.removeSchoolCallback.bind(this);
  }

  render () {
    const { school, users } = this.props;
    if(!school) return(<div/>)
    return (
      <div className="list-group-item min-content user-item">
        <div className="media">
          <div className="media-left media-middle icon-container">
            <img className="media-object img-circle" src={school.image} />
          </div>
          <div className ="media-body">
          <NavLink
            activeClassName="active"
            to={`/schools/${school.id}`}>
            <h4 className="media-heading tucked">
              <span placeholder="School">{school.name}</span>
            </h4>
          </NavLink>
          <span className ="media-middle tucked">Students: {users.filter(user=>(user.schoolId === school.id)).length}</span>
          </div>
          <div className="media-right media-middle">
            <button
                className="btn btn-default"
                onClick={this.removeSchoolCallback}>
              <span className="glyphicon glyphicon-remove" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  removeSchoolCallback (event) {
    const { removeSchoolThunk, removeUserThunk, user, school } = this.props;
    event.stopPropagation();
    removeSchoolThunk(school.id);
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = ({ users, schools }, ownProps) => ({users: users, schools:schools, school: ownProps.school});

const mapDispatchToProps = { removeUserThunk, removeSchoolThunk };

export default connect(mapStateToProps, mapDispatchToProps)(SchoolIcon);
