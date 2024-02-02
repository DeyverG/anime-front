import './AnimeSearch.scss'
import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

export const AnimeSearch = () => {

    const [nameSearch, setnameSearch] = useState('')

    return (
        <>
            <div className='ta-center'>
                <h1 className='mt-half'>* Anime Search *</h1>
                <div className='d-block d-sm-flex container-search'>
                    <TextField
                        fullWidth
                        className='mr-tiny mb-base'
                        id="outlined-basic"
                        label="Name of the anime"
                        variant="outlined"
                        value={nameSearch}
                        size='small'
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setnameSearch(event.target.value)}
                    />
                    <Button className='pr-xmedium pl-xmedium btn-search mb-base' variant="contained">Search</Button>
                </div>
            </div>
        </>
    )
}
