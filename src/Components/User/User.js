import React, { useState } from 'react';
import $ from 'jquery';
import axios from 'axios'

export default function User() {
console.log('Loaded')
    const baseUrl = 'https://api.github.com/users';
    const [name, setName] = useState('Dolapo Sokoya')
    // const [search, setSearch] = useState('Dolapo Sokoya')
    const [result, setResult] = useState('')

    $(".search").keyup(async () => {
        const search = $('.search').val();
        setName(search)
        console.log('Calling function')
        await getUserRepo(search)
        setResult(search)
    });

    const getUserRepo = async (name) => {
        const response = await axios(`${baseUrl}/${name}`,{
            method: 'get'
        })
        const data = await response.data
        console.log('Function called') 
        console.log('Data',data)
    }

    return (
        <div>
            <h2>Github Profile of {name}</h2>
            <input className="search" placeholder="Search for a user" />
            <h3>{result}</h3>
        </div>
    )
}
