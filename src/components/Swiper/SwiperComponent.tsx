import './SwiperComponent.scss';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { AnimeDataProps } from '../../interfaces/AnimeSearch/AnimeSearch';
import { useWindowDimensions } from '../../hooks/useDimensions';
import { useEffect, useState } from 'react';
import { Skeleton } from '@mui/material';

interface SwiperComponentProps {
  animeData: AnimeDataProps
  chargeMoreData: (page: number) => void
}

export const SwiperComponent = ({ animeData, chargeMoreData }: SwiperComponentProps) => {

  // Custom hook
  const { width } = useWindowDimensions();

  // State's
  const [slides, setSlides] = useState<number>(0)

  // Get more data when the user reach the end of the swiper if has next page is true
  const chargeMoreDataSwiper = (page: number) => {
    if (!animeData.has_next_page) return
    chargeMoreData(page)
  }

  // function that calculate the message depending on the score
  const calculateScore = (score: number): string => {
    if (score >= 1 && score <= 4.99) return 'I do not recommend it.'
    if (score >= 5 && score <= 7.99) return 'You may have fun.'
    if (score >= 8) return 'Great, this is one of the best anime.'
    return 'No score yet.'
  }

  useEffect(() => {
    if (width < 600) setSlides(1)
    if (width >= 600 && width < 960) setSlides(3)
    if (width >= 960 && width < 1280) setSlides(4)
    if (width >= 1280) setSlides(5)
  }, [width])

  return (
    <div className='container-swiper mt-medium'>
      <Swiper
        spaceBetween={10}
        slidesPerView={slides}
        navigation
        modules={[Navigation]}
        onReachEnd={() => chargeMoreDataSwiper(animeData.current_page + 1)}
      >
        {animeData.data.map((anime, idx) => {
          return (
            <SwiperSlide key={idx}>
              <div className='card-swiper'>
                <p className='title-card'>{anime.title}</p>
                <picture>

                  <source media="(max-width: 600px)" srcSet={anime.images.webp.small_image_url} type='image/webp' />
                  <source media="(max-width: 600px)" srcSet={anime.images.jpg.small_image_url} type='image/jpeg' />

                  <source media="(max-width: 960px)" srcSet={anime.images.webp.image_url} type='image/webp' />
                  <source media="(max-width: 960px)" srcSet={anime.images.jpg.image_url} type='image/jpeg' />

                  <source media="(min-width: 960px)" srcSet={anime.images.webp.large_image_url} type='image/webp' />
                  <source media="(min-width: 960px)" srcSet={anime.images.jpg.large_image_url} type='image/jpeg' />

                  <img src={anime.images.webp.image_url} alt={anime.title} />
                </picture>
                <p className='score-card'>{calculateScore(anime.score)}</p>
              </div>
            </SwiperSlide>
          )
        })}
        {/* Swiper loading */}
        {animeData.has_next_page &&
          <SwiperSlide>
            <Skeleton></Skeleton>
            <Skeleton className='skeleton-card'></Skeleton>
            <Skeleton></Skeleton>
          </SwiperSlide>}
      </Swiper>
    </div>
  )
}
