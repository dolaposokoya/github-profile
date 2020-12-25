import React from 'react'

export default function UserRepo(props) {

    return (
        <div className="container-fluid mt-5 repo">
            {props.name && <h3>Repository of {props.name}</h3>}
            {props.repository && props.repository.map((item, index) => {
                index += 1
                return (
                    <div key={index}>
                        <h2>Repository Name:{index} {item.name}</h2>
                    </div>
                )
            })}
        </div>
    )
}
