import axios from 'axios'

export default () => {
    return axios.create({
        baseURL: 'https://vue-course-project.herokuapp.com',
    });
}
