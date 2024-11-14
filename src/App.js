import useGetTopRatedMovies from './hooks/useGetTopRatedMovies';
import styled from 'styled-components';
import { Grid } from '@mui/material';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';

export const MovieContainer = styled(Grid)`
  display: flex;
  justify-content: center;
  padding: 16px;
`;

export const MovieItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.05);
  }
`;


export const MovieImage = styled.img`
  width: 100%;
  height: auto;
  border-bottom: 4px solid #ccc;
`;


export const MovieTitle = styled.h3`
  margin: 12px 0;
  font-size: 1.2rem;
  text-align: center;
  color: #333;
`;


function App() {
  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchNextPage, } = useGetTopRatedMovies();

  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage && !isFetchNextPage) {
      fetchNextPage();
    }

  }, [inView])

  return (
    <div>
      <Grid container spacing={4} sx={{ maxWidth: "1000px", margin: "auto" }}>
        {data?.pages.map((page, index) =>
          page.results.map((movie) => (
            <MovieContainer item sm={4} xs={12} key={movie.id}>
              <MovieItem>
                <MovieImage
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <MovieTitle>{movie.title}</MovieTitle>
              </MovieItem>
            </MovieContainer>
          ))
        )}
      </Grid>
      <h1 ref={ref}>Load More</h1>
    </div>
  );
}

export default App;
