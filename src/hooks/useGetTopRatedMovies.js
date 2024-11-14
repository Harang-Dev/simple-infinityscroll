import { useInfiniteQuery } from "@tanstack/react-query";

const fetchTopRatedMovies = async (page) => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?page=${page}`, {
        headers: {
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwODk5MjNlOWM2NzY0MWU2ZDk3YmEzNTg1Mzk1MWU1OCIsIm5iZiI6MTczMTU1ODYyOS44OTM0Mjg4LCJzdWIiOiI2NzM1N2JkYWQ2M2ZlZDU4MjZjZjBmZTQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.kmpYNlOKICCG9rB_nyooQ5s4q1bTodQNdpf8WvB23mg'
        }
    });
    return response.json();
};

const useGetTopRatedMovies = () => {
    return useInfiniteQuery({
        queryKey:['top-rated-movie'],
        queryFn:({pageParam})=>{
            return fetchTopRatedMovies(pageParam)
        },
        getNextPageParam:(last)=>{
            if(last.page < last.total_pages) {
                return last.page + 1;
            }
            return undefined;
        },
        initialPageParam: 1,
    });
};

export default useGetTopRatedMovies;