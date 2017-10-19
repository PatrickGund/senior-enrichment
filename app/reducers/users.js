import axios from 'axios';

/* -----------------    ACTION TYPES ------------------ */

const INITIALIZE_USERS    = 'INITIALIZE_USERS';
const CREATE_USER         = 'CREATE_USER';
const UPDATE_USER         = 'UPDATE_USER';
const REMOVE_USER         = 'REMOVE_USER';
const REMOVE_SCHOOL_USERS ='REMOVE_SCHOOL_USERS';

/* ------------   ACTION CREATORS     ------------------ */

const initUser   = user => ({ type: INITIALIZE_USERS, user });
const createUser = user => ({ type: CREATE_USER, user });
const removeUser = id   => ({ type: REMOVE_USER, id });
const updateUser = user => ({ type: UPDATE_USER, user });
export const removeSchoolUsers = id => ({ type: REMOVE_SCHOOL_USERS, id});

/* ------------       REDUCERS     ------------------ */

export default function reducer (users = [], action) {
  switch (action.type) {

    case INITIALIZE_USERS:
      return action.user;

    case CREATE_USER:
      return [action.user, ...users];

    case REMOVE_USER:
      return users.filter(user => user.id !== action.id);

    case REMOVE_SCHOOL_USERS:
      return users.filter(user => user.schoolId !== action.id);

    case UPDATE_USER:
      return users.map(user => (
        action.user.id === user.id ? action.user : user
      ));

    default:
      return users;
  }
}

/* ------------   THUNK CREATORS     ------------------ */

export const fetchUsers = () => dispatch => {
  axios.get('/api/users')
       .then(res => dispatch(initUser(res.data)))
       .catch(err => console.error('Fetching users unsuccessful', err));
};

export const fetchSingleUser = (id) => dispatch => {
  axios.get(`/api/users/${id}`)
       .then(res => dispatch(updateUsers(res.data)))
       .catch(err => console.error('Fetching user unsuccessful', err));
};

export const removeUserThunk = id => dispatch => {
  dispatch(removeUser(id));
  axios.delete(`/api/users/${id}`)
       .catch(err => console.error(`Removing user: ${id} unsuccessful`, err));
};

export const addUser = user => dispatch => {
  axios.post('/api/users', user)
       .then(res => dispatch(createUser(res.data)))
       .catch(err => console.error(`Creating user: ${user} unsuccessful`, err));
};

export const updateUserThunk = (id, user) => dispatch => {
  console.log('id',id,'user', user)
  axios.put(`/api/users/${id}`, user)
       .then(res => dispatch(updateUser(res.data)))
       .catch(err => console.error(`Updating user: ${user} unsuccessful`, err));
};
