import './AnimeSearch.scss'
import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { GetAnime } from '../../services/AnimeSearch/GetAnime'
import { SwiperComponent } from '../../components/Swiper/SwiperComponent'
import { AnimeDataProps } from '../../interfaces/AnimeSearch/AnimeSearch'

export const AnimeSearch = () => {

    // State's
    const [nameSearch, setnameSearch] = useState('')
    const [animeData, setdataAnime] = useState<AnimeDataProps>({ data: [], current_page: 0, has_next_page: false })

    // Function that call the API and get the data
    const handleSearch = async (page: number = 1) => {
        // Call the API
        const responseApi = await GetAnime(nameSearch, page)

        // If the response is not empty
        if (responseApi) {
            const animeOld = page !== 1 ? [...animeData.data] : []

            // add the new data to the state
            setdataAnime({
                data: [...animeOld, ...responseApi.data],
                current_page: responseApi.current_page,
                has_next_page: responseApi.has_next_page
            })
        }
    }

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
                    <Button
                        className='pr-xmedium pl-xmedium btn-search mb-base'
                        variant="contained"
                        disabled={nameSearch === ''}
                        onClick={() => handleSearch()}>
                        Search
                    </Button>
                </div>
                <div>
                    <SwiperComponent animeData={animeData} chargeMoreData={handleSearch} />
                </div>
            </div>
        </>
    )
}
