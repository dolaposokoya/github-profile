
import React, { useState } from 'react';
import axios from 'axios'
import UserView from '../UserView/UserView'
import { Container } from 'react-bootstrap'
import SearchResult from '../SearchResult/SearchResult'
import Modal from "../Modal/Modal";
// import { connect } from 'react-redux'
// import { bindActionCreators } from 'redux';
// import { getUserAction } from '../../Action/GetUserAction'



export default function Search(props) {

    const { resourceType } = props
    const baseUrl = 'https://api.github.com/users';
    const { REACT_APP_CLIENT_ID, REACT_APP_CLIENT_SECRET } = process.env
    const [iconType, setIconType] = useState('')
    const [alertType, setAlertType] = useState('')
    const [message, setMessage] = useState('')
    const [result, setResult] = useState()


    /**
     * Using the onKeyUp method search for user in the github API and return their data
     */
    const getUserInfo = async (event) => {
        try {
            let request = event.target.value
            if (request) {
                const response = await axios.get(`${baseUrl}/${request}?client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET}`)
                const data = await response.data
                if (!data) {
                    setMessage('No Data found');
                    setAlertType('info')
                    setIconType("fas fa-info-circle")
                    setResult('')
                    setTimeout(() => setMessage(''), 3500);
                }
                else if (response.status === 200) {
                    const { id, avatar_url, name, public_repos } = data
                    const res = await getUserRepo(request);
                    const user = { id: id, avatar_url: avatar_url, name: name, public_repos: public_repos, repository: res }
                    setResult(user)
                }
            }
            else {
                setMessage('No input provided');
                setAlertType('info')
                setIconType("fas fa-info-circle")
                setResult('')
                setTimeout(() => setMessage(''), 3500);
            }
        }
        catch (error) {
            setMessage('Something went wrong');
            setAlertType('danger')
            setIconType("fas fa-exclamation-triangle")
            setResult('')
            setTimeout(() => setMessage(''), 3500);
        }
    }

    /**
     * Get the repo of the user returned from getUserInfo() function
     */
    const getUserRepo = async (request) => {
        try {
            let userRepo;
            if (request) {
                const response = await axios.get(`${baseUrl}/${request}/repos?client_id=${REACT_APP_CLIENT_ID}&client_secret=${REACT_APP_CLIENT_SECRET}`)
                const data = await response.data
                if (!data) {
                    setMessage('No Repository found');
                    setAlertType('info')
                    setIconType("fas fa-info-circle")
                    setResult('')
                    setTimeout(() => setMessage(''), 3500);
                }
                else if (response.status === 200) {
                    userRepo = data.slice(0, 0 + 5)
                    return userRepo
                }
            }
            else {
                setMessage('No input provided');
                setAlertType('info')
                setIconType("fas fa-info-circle")
                setResult('')
                setTimeout(() => setMessage(''), 3500);
            }
        }
        catch (error) {
            setMessage('Something went wrong');
            setAlertType('danger')
            setIconType("fas fa-exclamation-triangle")
            setResult('')
            setTimeout(() => setMessage(''), 3500);
        }
    }

    return (
        <div>
            {message && <Modal iconType={iconType} message={message} alertType={alertType} />}
            <div className="alertMessage">
                {message && <div className={`message alert alert-${alertType}`} role="alert"><i className={`${iconType}`}></i> {message}</div>}
            </div>
            {resourceType === 'search' ? <div>
                <div className="container-fluid mt-5 search-bar">
                    <div className="input-group">
                        <input style={{ padding: '15px 15px 15px 5px', width: '100%', border: 'none', borderRadius: '5px' }} className="search" placeholder="Search for a user" onKeyUp={(e) => getUserInfo(e)} />
                    </div>
                </div>
                {result && <Container><SearchResult result={result} /></Container>}
            </div> : <> <UserView resourceType={resourceType} /></>}
        </div>
    )
}

// const mapStateToProps = (state) => {
//     const { userData } = state.getUserReducer
//     return {
//         userData
//     }
// }

// const mapDispatchToProps = dispatch => bindActionCreators({ getUserAction }, dispatch);

// export default connect(mapStateToProps, mapDispatchToProps)(Search)
