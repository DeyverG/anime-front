import './AnimeSearch.scss'
import React, { useState } from 'react'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import { GetAnime } from '../../services/AnimeSearch/GetAnime'
import { SwiperComponent } from '../../components/Swiper/SwiperComponent'
import { AnimeDataProps } from '../../interfaces/AnimeSearch/AnimeSearch'
import { version } from '../../../package.json'

export const AnimeSearch = () => {

    // State's
    const [nameSearch, setNameSearch] = useState('')
    const [animeData, setDataAnime] = useState<AnimeDataProps>({ data: [], pagination: { current_page: 0, has_next_page: false } })

    // Function that call the API and get the data
    const handleSearch = async (page: number = 1) => {
        // Call the API
        const responseApi = await GetAnime(nameSearch, page)

        // If the response is not empty
        if (responseApi) {
            const animeOld = page !== 1 ? [...animeData.data] : []

            // add the new data to the state
            setDataAnime({
                data: [...animeOld, ...responseApi.data],
                pagination: {
                    current_page: responseApi.pagination.current_page,
                    has_next_page: responseApi.pagination.has_next_page
                }
            })
        }
    }

    return (
        <div className='ta-center'>
            <h1 className='mt-half'>* Anime Search {version}*</h1>
            <form>
                <div className='d-block d-sm-flex container-search'>
                    <TextField
                        fullWidth
                        className='mr-tiny mb-base'
                        id="outlined-basic"
                        label="Name of the anime"
                        variant="outlined"
                        value={nameSearch}
                        size='small'
                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setNameSearch(event.target.value)}
                    />
                    <Button
                        className='pr-xmedium pl-xmedium btn-search mb-base'
                        variant="contained"
                        disabled={nameSearch === ''}
                        onClick={() => handleSearch()}>
                        Search
                    </Button>
                </div>
            </form>
            <div>
                <SwiperComponent animeData={animeData} chargeMoreData={handleSearch} />
            </div>
        </div>
    )
}
