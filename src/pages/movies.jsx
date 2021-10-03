import { Movie } from "domains/movies";
import { Button } from "components/button";
import { ArrowCircleLeftIcon, ArrowCircleRightIcon } from  "@heroicons/react/solid";
import { useMovies } from "domains/movies"


export const Movies = () => {
    const { isError, isLoading, error, data, page, setPage } = useMovies()

    const renderMovies = () => {
        return data.map((movie) => {
            return (
                <Movie 
                key={movie._id}
                id={movie._id}
                title={movie.title}
                overview={movie.overview}
                releaseDate={movie.releaseDate}
                posterUrl={movie.posterUrl}
                />
            )
        })
    }
    
    return (
        <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
                <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">Movies</h1>
            </div>
            <div className="navigation mb-12 inline-flex items-center">
                <Button 
                type="button" 
                className="m-3"
                onClick={() => page > 1 && setPage(page - 1)}
                >   
                    <ArrowCircleLeftIcon className="h-5 w-5 mx-1" />Previous
                </Button>
                Page {page}
                <Button 
                type="button" 
                className="m-3"
                onClick={() => setPage(page + 1)}
                >
                    Next<ArrowCircleRightIcon className="h-5 w-5 mx-1" />
                </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-x-4 gap-y-8 xl:grid-cols-3 xl:gap-x-6">
                { isLoading ? <p>Loading...</p>
                : isError ? <p>{error.message}</p>
                : renderMovies()
                }
            </div>
        </div>
    )
}