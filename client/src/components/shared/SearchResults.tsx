import { Models } from "appwrite"

// Components
import Loader from "./Loader"
import GridPostList from "./GridPostList"

type SearchResultProps = {
    isSearchFetching: boolean
    searchedPost: Models.Document[]
}

const SearchResults = ({ isSearchFetching, searchedPost }: SearchResultProps) => {
    if (isSearchFetching) return <Loader />

    if (searchedPost && searchedPost.documents.length > 0) {
        return (
            <GridPostList
                posts={searchedPost.documents}
            />
        )
    }

    return (
        <>
            <p className="text-light-4 mt-10 text-center w-full">No Results Found!!</p>
        </>
    )
}

export default SearchResults