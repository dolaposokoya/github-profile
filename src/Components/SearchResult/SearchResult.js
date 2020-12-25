import React, { useState } from 'react';
import { Card, Button, Image } from 'react-bootstrap'
import Modal from "../Modal/Modal";

export default function SearchResult(props) {

    const [iconType, setIconType] = useState('')
    const [alertType, setAlertType] = useState('')
    const [message, setMessage] = useState('')
    const [repo, setRepo] = useState()

    const { result } = props
    const storeUser = async (user) => {
        const users = await props.getUsers()
        const { id, avatar_url, name, repository } = user
        console.log('Lenght', users.length)
        if (users.length === 0) {
            users.push({ id, avatar_url, name, repository })
            localStorage.setItem('users', JSON.stringify(users))
            setMessage('User Added');
            setAlertType('success')
            setIconType("far fa-check-circle")
            setTimeout(() => setMessage(''), 5000);
            const userDeatils = JSON.parse(localStorage.getItem('users'))
            setRepo(userDeatils)
        }
        else if (users.length > 0) {
            users.forEach((item) => {
                if (parseInt(item.id) === parseInt(id)) {
                    console.log('Check user match', item.id, 'User id', id)
                    setMessage('User Present');
                    setAlertType('info')
                    setIconType("fas fa-info-circle")
                    setTimeout(() => setMessage(''), 5000);
                }
                else if (parseInt(item.id) !== parseInt(id)) {
                    console.log('Check user not match', item.id)
                    users.push(user)
                    localStorage.setItem('users', JSON.stringify(users))
                    setMessage('User Added');
                    setAlertType('success')
                    setIconType("far fa-check-circle")
                    setTimeout(() => setMessage(''), 5000);
                    const userDeatils = JSON.parse(localStorage.getItem('users'))
                    setRepo(userDeatils)
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
                    <Button type="button" variannt="primary" onClick={() => storeUser(result)}>Add User</Button>
                </div>
            </Card>
        </div>
    )
}
