import React, { useState } from 'react';
import $ from 'jquery';
import axios from 'axios'

export default function User() {
    console.log('Loaded')
    const baseUrl = 'https://api.github.com/users';
    const client_id = '192c6b5772044f48a9ba'
    const client_secret = '40c2eefc4ffaa2cf7544e3ac83f1939e8d225d66'
    const [iconType, setIconType] = useState('')
    const [alertType, setAlertType] = useState('')
    const [message, setMessage] = useState('')
    const [result, setResult] = useState()


    const getUserRepo = async (event) => {
        try {
            let request = event.target.value
            const response = await axios.get(`${baseUrl}/${request}?client_id=${client_id}&client_secret=${client_secret}`)
            const data = await response.data
            if (!data) {
                setMessage('No Data found');
                setAlertType('info')
                setIconType("fas fa-info")
                setResult('')
                setTimeout(() => setMessage(''), 5000);
            }
            else if (response.status === 200) {
                setMessage('User found');
                setAlertType('success')
                setIconType("far fa-check-circle")
                setResult(data)
                setTimeout(() => setMessage(''), 5000);
                // console.log('Function called', response)
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
                {message && <div className={`message alert alert-${alertType}`} role="alert"> <i className={`${iconType}`}></i> {message}</div>}
            </div>
            <div className="container-fluid mt-5 search-bar">
                <div className="input-group">
                    <input style={{ padding: '15px 15px 15px 0', width: '70%' }} className="search" placeholder="Search for a user" onKeyUp={(e) => getUserRepo(e)} />
                </div>
            </div>
            <div className="container-fluid mt-5 box">
                <div>
                    <h2 className="name">Github Profile {result && <>of {result.name}</>}</h2>
                </div>
                {result && <div className="user-box">
                    <img src={result.avatar_url} />
                    <h3>Name: {result.name}</h3>
                    <h3>Repositries: {result.public_repos}</h3>
                </div>}
            </div>
        </div>
    )
}
