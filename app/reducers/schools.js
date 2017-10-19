import axios from 'axios';
import {removeSchoolUsers} from './users';

/* -----------------    ACTION TYPES ------------------ */

const INITIALIZE_SCHOOLS   = 'INITIALIZE_SCHOOLS';
const CREATE_SCHOOL        = 'CREATE_SCHOOL';
const REMOVE_SCHOOL        = 'REMOVE_SCHOOL';
const UPDATE_SCHOOL        = 'UPDATE_SCHOOL';




/* ------------   ACTION CREATORS     ------------------ */

const initSchool   = school  => ({ type: INITIALIZE_SCHOOLS, school });
const createSchool = school  => ({ type: CREATE_SCHOOL, school });
const removeSchool = id      => ({ type: REMOVE_SCHOOL, id });
const updateSchool = school  => ({ type: UPDATE_SCHOOL, school });

/* ------------       REDUCER     ------------------ */

export default function reducer (schools = [], action) {
  switch (action.type) {


    case INITIALIZE_SCHOOLS:
      return action.school;

    case CREATE_SCHOOL:
      return [action.school, ...schools];

    case REMOVE_SCHOOL:
      return schools.filter(school => school.id !== action.id);

    case UPDATE_SCHOOL:
      return schools.map(school => (
        action.school.id === school.id ? action.school : school
      ));

    default:
      return schools;
  }
}



/* ------------   THUNK CREATORS     ------------------ */



export const fetchSchools = () => dispatch => {
  axios.get('/api/schools')
       .then(res => dispatch(initSchool(res.data)));
};

export const fetchSingleSchool = (id) => dispatch => {
  axios.get(`/api/schools/${id}`)
       .then(res => dispatch(updateSchool(res.data)))
       .catch(err => console.error('Fetching school unsuccessful', err));
};

export const removeSchoolThunk = id => dispatch => {
  dispatch(removeSchool(id));
  dispatch(removeSchoolUsers(id));
  axios.delete(`/api/schools/${id}`)
       .catch(err => console.error(`Removing school: ${id} unsuccesful`, err));
};

export const addSchool = school => dispatch => {
  console.log('school', school)
  axios.post('/api/schools', school)
       .then(res => dispatch(createSchool(res.data)))
       .catch(err => console.error(`Creating school: ${school} unsuccesful`, err));
};

export const updateSchoolThunk = (id, school) => dispatch => {
  axios.put(`/api/schools/${id}`, school)
       .then(res => dispatch(updateSchool(res.data)))
       .catch(err => console.error(`Updating school: ${school} unsuccesful`, err));
};
