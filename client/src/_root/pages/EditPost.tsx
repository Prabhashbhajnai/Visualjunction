import { useParams } from "react-router-dom"

// Queries and Mutations
import { useGetPostById } from "@/lib/react-query/queriesAndMutations"

// component
import PostForm from "@/components/forms/PostForm"
import Loader from "@/components/shared/Loader"

const EditPost = () => {
    const { id } = useParams()

    const { data: post, isPending } = useGetPostById(id || '')

    if(isPending) return <Loader />

    return (
        <>
            <div className='flex flex-1'>
                <div className='common-container'>
                    <div className='max-w-5xl flex-start gap-3 justify-start'>
                        <img
                            src='/assets/icons/add-post.svg'
                            alt='add'
                            width={36}
                            height={36}
                        />
                        <h2 className='h3-bold md:h2-bold text-left w-full'>Edit Post</h2>
                    </div>

                    <PostForm post={post} action="Update" />
                </div>
            </div>
        </>
    )
}

export default EditPost