import React, { useState, useEffect } from 'react';
import { Card, Button, Image } from 'react-bootstrap'
import Modal from "../Modal/Modal";

export default function SearchResult(props) {

    const [iconType, setIconType] = useState('')
    const [alertType, setAlertType] = useState('')
    const [message, setMessage] = useState('')
    const [action, setAction] = useState('Add User')


    const { result } = props

    useEffect(() => {
        checkUser()
        // return () => {
        //     cleanup
        // }
    }, [result])

    const checkUser = () => {
        console.log('Called')
        const users = props.getUsers()
        users.map(item => {
            if (item.id === result.id) {
                console.log('User found')
                setAction('Already added')
                return true
            }
            else {
                console.log('No user found')
                setAction('Add User')
                return false
            }
        })
    }

    const storeUser = async (user) => {
        const users = props.getUsers()
        const { id, avatar_url, name, repository } = user
        if (users.length === 0) {
            users.push({ id, avatar_url, name, repository })
            localStorage.setItem('users', JSON.stringify(users))
            setMessage('User Added');
            checkUser()
            setAlertType('success')
            setIconType("far fa-check-circle")
            setTimeout(() => setMessage(''), 5000);
        }
        else if (users.length > 0) {
            users.forEach((item) => {
                if (parseInt(item.id) === parseInt(id)) {
                    setMessage('User Present');
                    checkUser()
                    setAlertType('info')
                    setIconType("fas fa-info-circle")
                    setTimeout(() => setMessage(''), 5000);
                }
                else {
                    users.push(user)
                    localStorage.setItem('users', JSON.stringify(users))
                    checkUser()
                    setMessage('User Added');
                    setAlertType('success')
                    setIconType("far fa-check-circle")
                    setTimeout(() => setMessage(''), 5000);
                }
            })
        }
    }
    return (
        <div>
            {message && <Modal iconType={iconType} message={message} alertType={alertType} />}
            <Card className="container-fluid mt-5 box">
                <div className="user-box">
                    <Image src={result.avatar_url} roundedCircle />
                    <Card.Title>Name: {result.name}</Card.Title>
                    <Card.Title>Repositries: {result.public_repos}</Card.Title>
                    {action === 'Add User' ? <Button type="button" variant="primary" onClick={() => storeUser(result)}>{action}</Button> : <Button type="button" variant="secondary" disabled>{action}</Button>}
                </div>
            </Card>
        </div>
    )
}
