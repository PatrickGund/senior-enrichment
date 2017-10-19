import React from 'react';
import { connect } from 'react-redux';
import {BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Root from './components/Root';
import Home from './components/Home';
import UserList from './components/Users/UserList';
import UserDetail from './components/Users/UserDetail';
import SchoolDetail from './components/Schools/SchoolDetail';
import { fetchUsers } from './reducers/users';
import { fetchSchools } from './reducers/schools';


class Routes extends React.Component {

  componentDidMount () {
    this.props.fetchData();
  }

  render () {
    return (
      <Router>
        <Root>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/users" component={UserList} />
            <Route exact path="/schools" component={Home} />
            <Route path="/users/:id" component={UserDetail} />
            <Route path="/schools/:id" component={SchoolDetail} />
            <Route component={Home} />
          </Switch>
        </Root>
      </Router>
    );
  }
}

/* -----------------    CONTAINER     ------------------ */

const mapStateToProps = null;

const mapDispatchToProps = dispatch => ({
  fetchData: () => {
    dispatch(fetchUsers());
    dispatch(fetchSchools());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
