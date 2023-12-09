import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer'

// Queries and Mutataions
import { useGetInfiniteUsers } from '@/lib/react-query/queriesAndMutations'

// Components
import UserCard from '@/components/shared/UserCard'
import Loader from '@/components/shared/Loader';

const AllUsers = () => {
    const { ref, inView } = useInView();

    const { data: users, fetchNextPage, hasNextPage } = useGetInfiniteUsers()

    useEffect(() => {
        if (inView)
            fetchNextPage()
    }, [inView])

    return (
        <>
            <div className='common-container'>
                <h2 className="h3-bold md:h2-bold text-left w-full">All Users</h2>

                <ul className='user-container gap-10'>
                    {users?.pages.map((user, index) => (
                        <UserCard
                            users={user.documents}
                            key={`page-${index}`}
                        />
                    ))}
                </ul>

                {hasNextPage && (
                    <div ref={ref} className='mt-10'>
                        <Loader />
                    </div>
                )}
            </div>
        </>
    )
}

export default AllUsers