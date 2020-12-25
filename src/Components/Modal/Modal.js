import React from 'react'

export default function Modal(props) {

    const { alertType, iconType, message } = props
    return (
        <div className="alertMessage">
            {message && <div className={`message alert alert-${alertType}`} role="alert"><i className={`${iconType}`}></i> {message}</div>}
        </div>
    )
}
