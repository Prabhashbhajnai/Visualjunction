import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";
import { useGetCurrentUser } from "@/lib/react-query/queriesAndMutations"
import { Models } from "appwrite";

const Saved = () => {
    const { data: currentUser } = useGetCurrentUser()

    const savePosts = currentUser?.save
        .map((savePost: Models.Document) => ({
            ...savePost.post,
        })).reverse();

    return (
        <>
            <div className='saved-container'>
                <div className='flex w-full gap-3'>
                    <img
                        src='/assets/icons/save.svg'
                        className='invert-white'
                        width={30}
                        height={30}
                    />
                    <h2 className='h3-bold md:h2-bold w-full'>Saved Posts</h2>
                </div>

                {!currentUser ? (
                    <Loader />
                ) : (
                    savePosts.length === 0 ? (
                        <p className="text-light-4">No Posts saved yet</p>
                    ) : (
                        <GridPostList posts={savePosts} showStats={false} />
                    )
                )}

            </div>
        </>
    )
}

export default Saved