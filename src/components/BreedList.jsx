import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    useEffect
} from "react";

import {
    fetchBreeds
} from "../features/breeds/breedSlice";

function BreedList() {
    const dispatch = useDispatch();

    const {
        breeds,
        loading,
        error,
    } = useSelector(
        (state) => state.breeds
    );

    useEffect(() => {
        if (breeds.length === 0) {
            dispatch(fetchBreeds());
        }
    }, [dispatch, breeds.length]);

    if (loading)
        return <h2>Loading...</h2>;

    if (error)
        return <h2>Error: {error}</h2>;

    return (
        <div>
            {breeds.map((breed) => (
                <div
                    key={breed.id}
                    style={{
                        border: "1px solid #ccc",
                        margin: "10px",
                        padding: "10px",
                    }}
                >
                    <h3>
                        {
                            breed.attributes
                                .name
                        }
                    </h3>

                    <p>
                        {
                            breed.attributes
                                .description
                        }
                    </p>
                </div>
            ))}
        </div>
    );
}

export default BreedList;