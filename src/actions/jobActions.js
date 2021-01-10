import { jobConstants } from '../helpers/constants';
import { history } from '../helpers/history';

export const jobActions = {
    setPostings,
    addPosting
}

function setPostings(){
    return dispatch => {
        dispatch({
            type: jobConstants.POSTING_SUCCESS,
            payload: [
                {
                    id: 1,
                    job_title: "Project Manager with Graphic Design / Creative Experience",
                    job_description: "",
                    job_employment_type: "Part-Time",
                    job_salary: "300",
                    job_email_address: "demo@sample.com",
                    job_skills: [
                        {
                            id: 1,
                            name: 'Graphics & Multimedia'
                        },
                        {
                            id: 2,
                            name: 'English'
                        },
                        {
                            id: 3,
                            name: 'Logo Design'
                        },
                        {
                            id: 4,
                            name: 'Adobe Indesign'
                        }
                    ]
                }
            ]
        });
    };
}

function addPosting(post){
    return dispatch => {
        dispatch({
            type: jobConstants.POSTING_SUCCESS,
            payload: post
        });
        history.push('/dashboard');
    };
}