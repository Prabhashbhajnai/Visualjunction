// Queries and Mutations

import { useGetUserById } from "@/lib/react-query/queriesAndMutations"
import { useParams } from "react-router-dom"


const Profile = () => {
    const { id } = useParams()
    const { data: user, isPending: isLoadingUser } = useGetUserById(id || '')
    console.log(user);


    return (
        <div>Profile</div>
    )
}

export default Profile