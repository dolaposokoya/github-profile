import React, { useState, useEffect } from 'react';
import { Card, Button, Image } from 'react-bootstrap'
import Modal from "../Modal/Modal";
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getUserAction } from '../../Action/GetUserAction'
import { storeUserAction } from '../../Action/StoreUserAction'

function SearchResult(props) {

    const [iconType, setIconType] = useState('')
    const [alertType, setAlertType] = useState('')
    const [message, setMessage] = useState('')
    const [action, setAction] = useState('Add User')


    const { result } = props

    useEffect(() => {
        checkUser()
        return () => {
            checkUser()
        }
    }, [result])


    /**
     * Check if the returned use already exist
     */
    const checkUser = () => {
        props.getUserAction(response => {
            response.users.map(item => {
                if (item.id === result.id) {
                    setAction('Already added')
                    return true
                }
                else {
                    setAction('Add User')
                    return false
                }
            })
        })
    }

    /**
     * Store the user into localstorage
     */
    const storeUser = async (user) => {
        props.getUserAction(response => {
            let users = response.users;
            props.storeUserAction(user, response => {
                if (response.success === true) {
                    setMessage(response.message);
                    checkUser()
                    setAlertType('success')
                    setIconType("far fa-check-circle")
                    setTimeout(() => setMessage(''), 3500);
                }
                else {
                    setMessage(response.message);
                    checkUser()
                    setAlertType('info')
                    setIconType("fas fa-info-circle")
                    setTimeout(() => setMessage(''), 3500);
                }
            })
        })
    }

    return (
        <div>
            {message && <Modal iconType={iconType} message={message} alertType={alertType} />}
            <Card className="mt-5 user-box">
                <div>
                    {console.log(result.name)}
                    <Image src={result.avatar_url} roundedCircle />
                    <Card.Title>Name: {result.name === null ? 'Name not  defined' : result.name}</Card.Title>
                    <Card.Title>Repositries: {result.public_repos}</Card.Title>
                    {action === 'Add User' ? <Button type="button" variant="primary" onClick={() => storeUser(result)}>{action}</Button> : <Button type="button" variant="secondary" disabled style={{ pointerEvents: 'none' }}>{action}</Button>}
                </div>
            </Card>
        </div>
    )
}

const mapStateToProps = (state) => {
    const { users } = state.getUserReducer
    const { user } = state.storeUserReducer
    console.log('Users', user)
    return {
        users,
        user
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({ getUserAction, storeUserAction }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SearchResult)