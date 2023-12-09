// Queries and Mutations
import { useGetCurrentUser } from '@/lib/react-query/queriesAndMutations'

// Components
import EditProfileForm from '@/components/forms/EditProfileForm'

const UpdateProfile = () => {
    const { data: currentUser } = useGetCurrentUser()
    // console.log(currentUser);
    

    return (
        <div className='flex flex-1'>
            <div className='common-container'>
                <div className='max-w-5xl flex-start gap-3 justify-start'>
                    <img
                        src='/assets/icons/edit.svg'
                        alt='add'
                        width={36}
                        height={36}
                    />
                    <h2 className='h3-bold md:h2-bold text-left w-full'>Edit Profile</h2>
                </div>
                <EditProfileForm user={currentUser} />
            </div>
        </div>
    )
}

export default UpdateProfile