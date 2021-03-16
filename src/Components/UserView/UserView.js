import React, { useEffect, useState } from 'react';
import { Card, Button, Image } from 'react-bootstrap'
import Modal from "../Modal/Modal";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getUserAction } from '../../Action/GetUserAction'
import { storeUserAction } from '../../Action/StoreUserAction'


const UserView = (props) => {

    const [repo, setRepo] = useState([])
    const [iconType, setIconType] = useState('')
    const [alertType, setAlertType] = useState('')
    const [message, setMessage] = useState('')

    useEffect(() => {
        users()
    }, [message])


    /**
     * Get all user from the localstorage
     */
    function users() {
        props.getUserAction(res => {
            setRepo(res.users)
        })
    }

    /**
     * Delete a particular user from the local storage using their ID
     */
    const deleteUser = (id) => {
        props.getUserAction(response => {
            response.users.forEach((user, index) => {
                if (user.id === id) {
                    response.users.splice(index, 1)
                }
            })
            localStorage.setItem('users', JSON.stringify(response.users))
            setMessage('User Deleted');
            setAlertType('success')
            setIconType("far fa-check-circle")
            setTimeout(() => setMessage(''), 3500);
        })
    }


    return (
        <div>
            {message && <Modal iconType={iconType} message={message} alertType={alertType} />}
            {repo && repo.map((item, index) => {
                return (
                    <div style={{ marginBottom: '25px' }}>
                        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', maxWidth: '600px' }}>
                            <div className="card-action">
                                <h6 className="header">Repository of: {item.name === null ? 'Undefined' : item.name}</h6>
                            </div>
                            <div className="card-image waves-effect waves-block waves-light">
                                <img src={item.avatar_url} alt="user" />
                            </div>
                            <div className="card-content">
                                {item.repository && item.repository.map((item, index) => {
                                    index += 1
                                    return (
                                        <div className="card-action" key={index}>
                                            <a className="waves-effect waves-light">{item.name === null ? 'No repository found' : item.name}</a>
                                        </div>
                                    )
                                })}
                                <div className="card-action">
                                    <a className="waves-effect waves-light btn" style={{ backgroundColor: '#f87c6b' }} variant="danger" onClick={() => deleteUser(item.id)}>Delete</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

const mapStateToProps = (state) => {
    const { users } = state.getUserReducer
    const { user } = state.storeUserReducer
    return {
        users,
        user
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getUserAction, storeUserAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserView)