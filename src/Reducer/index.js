import { combineReducers } from 'redux';
import authReducer from '../Slices/AuthSlice'
import cartReducer from '../Slices/CartSlice'
import profileReducer from '../Slices/ProfileSlice'
import courseReducer from '../Slices/CourseSlice'
import viewCourseReducer from '../Slices/ViewCourseSlice'

const rootReducer = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    profile: profileReducer,
    course: courseReducer,
    viewCourse: viewCourseReducer,
});

export default rootReducer