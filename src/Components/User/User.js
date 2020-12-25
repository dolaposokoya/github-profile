import React, { useState } from 'react';
import $ from 'jquery';
import axios from 'axios'
import UserRepo from '../Repositories/UserRepo'

export default function User() {
    console.log('Loaded')
    const baseUrl = 'https://api.github.com/users';
    const client_id = '192c6b5772044f48a9ba'
    const client_secret = '40c2eefc4ffaa2cf7544e3ac83f1939e8d225d66'
    const [iconType, setIconType] = useState('')
    const [alertType, setAlertType] = useState('')
    const [message, setMessage] = useState('')
    const [result, setResult] = useState()
    const [repo, setRepo] = useState()


    const getUsers = async () => {
        let users;
        if (localStorage.getItem('users') === null) {
            users = []
        }
        else {
            users = JSON.parse(localStorage.getItem('users'))
        }
        return users
    }

    const storeUser = async (user) => {
        const users = await getUsers()
        const { id, avatar_url, name, public_repos } = user
        if (users.length === 0) {
            users.push({ id: id, avatar_url: avatar_url, name, public_repos })
            localStorage.setItem('users', JSON.stringify(users))
            setMessage('User Added');
            setAlertType('success')
            setIconType("far fa-check-circle")
            setTimeout(() => setMessage(''), 5000);
        }
        else {
            users.forEach((item) => {
                console.log('Check user', user)
                if (item.id === id) {
                    setMessage('User Present');
                    setAlertType('info')
                    setIconType("fas fa-info-circle")
                    setTimeout(() => setMessage(''), 5000);
                }
                else {
                    users.push(user)
                    localStorage.setItem('users', JSON.stringify(users))
                    setMessage('User Added');
                    setAlertType('success')
                    setIconType("far fa-check-circle")
                    setTimeout(() => setMessage(''), 5000);
                }
            })
        }
    }

    const deleteUser = async (id) => {
        const users = await getUsers()
        users.forEach((user, index) => {
            if (user.id === id) {
                users.splice(index, 1)
            }
        })
        localStorage.setItem('users', JSON.stringify(users))
        setMessage('User Deleted');
        setAlertType('success')
        setIconType("far fa-check-circle")
        setTimeout(() => setMessage(''), 5000);
    }

    // const removeUser = async ()
    const getUserInfo = async (event) => {
        try {
            let request = event.target.value
            if (request) {
                const response = await axios.get(`${baseUrl}/${request}?client_id=${client_id}&client_secret=${client_secret}`)
                const data = await response.data
                if (!data) {
                    setMessage('No Data found');
                    setAlertType('info')
                    setIconType("fas fa-info-circle")
                    setResult('')
                    setRepo('')
                    setTimeout(() => setMessage(''), 5000);
                }
                else if (response.status === 200) {
                    const { id, avatar_url, name, public_repos } = data
                    setResult(data)
                    const user = { id: id, avatar_url: avatar_url, name: name, public_repos: public_repos }
                    await getUserRepo(request);
                }
            }
            else {
                setMessage('No input provided');
                setAlertType('info')
                setIconType("fas fa-info-circle")
                setResult('')
                setRepo('')
                setTimeout(() => setMessage(''), 5000);
            }
        }
        catch (error) {
            setMessage(error.message);
            setAlertType('danger')
            setIconType("fas fa-exclamation-triangle")
            setResult('')
            setTimeout(() => setMessage(''), 5000);
        }
    }

    const getUserRepo = async (request) => {
        try {
            if (request) {
                const response = await axios.get(`${baseUrl}/${request}/repos?client_id=${client_id}&client_secret=${client_secret}`)
                const data = await response.data
                if (!data) {
                    setMessage('No Repository found');
                    setAlertType('info')
                    setIconType("fas fa-info-circle")
                    setResult('')
                    setRepo('')
                    setTimeout(() => setMessage(''), 5000);
                }
                else if (response.status === 200) {
                    setRepo(data.slice(0, 0 + 5))
                }
            }
            else {
                setMessage('No input provided');
                setAlertType('info')
                setIconType("fas fa-info-circle")
                setResult('')
                setRepo('')
                setTimeout(() => setMessage(''), 5000);
            }
        }
        catch (error) {
            setMessage('Something went wrong');
            setAlertType('danger')
            setIconType("fas fa-exclamation-triangle")
            setResult('')
            setTimeout(() => setMessage(''), 5000);
        }
    }

    return (
        <div>
            <div className="alertMessage">
                {message && <div className={`message alert alert-${alertType}`} role="alert"><i className={`${iconType}`}></i> {message}</div>}
            </div>
            <div className="container-fluid mt-5 search-bar">
                <div className="input-group">
                    <input style={{ padding: '15px 15px 15px 5px', width: '100%', border: 'none', borderRadius: '5px' }} className="search" placeholder="Search for a user" onKeyUp={(e) => getUserInfo(e)} />
                </div>
            </div>
            <div className="container-fluid mt-5 box">
                {result && <div className="user-box">
                    <img src={result.avatar_url} />
                    <h3>Name: {result.name}</h3>
                    <h3>Repositries: {result.public_repos}</h3>
                    <button type="button" className="btn btn-primary" onClick={() => storeUser(result)}>Add User</button>
                </div>}
            </div>
            {repo && <UserRepo name={result && result.name} repository={repo && repo} />}
        </div>
    )
}
