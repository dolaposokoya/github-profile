import React, { useEffect, useState } from 'react';
import { Card, Button, Image } from 'react-bootstrap'
import Modal from "../Modal/Modal";
export default function UserView(props) {


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
    const users = () => {
        const users = props.getUsers()
        setRepo(users)
    }

    /**
     * Delete a particular user from the local storage using their ID
     */
    const deleteUser = (id) => {
        const users = props.getUsers()
        users.forEach((user, index) => {
            if (user.id === id) {
                users.splice(index, 1)
            }
        })
        localStorage.setItem('users', JSON.stringify(users))
        setMessage('User Deleted');
        setAlertType('success')
        setIconType("far fa-check-circle")
        setTimeout(() => setMessage(''), 3500);
    }


    return (
        <div>
            {message && <Modal iconType={iconType} message={message} alertType={alertType} />}
            {repo && repo.map((item, index) => {
                return (
                    <Card className="mb-2" key={index} style={{ maxWidth: '600px' }}>
                        <Card.Body>
                            <div className="d-flex justify-content-between">
                                <div>
                                    <Card.Title className="mb-5">Repository of <span className="text-muted fonwt-weight-light">{item.name === null ? 'Name not defined' : item.name}</span></Card.Title>
                                </div>
                                <Image roundedCircle src={item.avatar_url} style={{ width: '55px', height: '55px' }} />
                            </div>
                            {item.repository && item.repository.map((item, index) => {
                                index += 1
                                return (
                                    <div key={index}>
                                        <Card.Subtitle className="mt-2 mb-2"><i className="fas fa-folder-open"></i> <span className="text-muted font-weight-light">{item.name === null ? 'No repository found' : item.name}</span></Card.Subtitle>
                                        <hr></hr>
                                    </div>
                                )
                            })}
                            <Card.Text className="mt-4">
                                <Button variant="danger" onClick={() => deleteUser(item.id)}>Delete</Button>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                )
            })}
        </div>
    )
}
