import { Link, Outlet, Route, Routes, useLocation, useParams } from "react-router-dom"

// Queries and Mutations
import { useGetUserById } from "@/lib/react-query/queriesAndMutations"
import { useUserContext } from "@/context/AuthContext"

// Components
import { Button } from "@/components/ui/button";
import GridPostList from "@/components/shared/GridPostList";
import Loader from "@/components/shared/Loader";

interface StabBlockProps {
    value: string | number;
    label: string;
}

const StatBlock = ({ value, label }: StabBlockProps) => (
    <div className="flex-center gap-2">
        <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
        <p className="small-medium lg:base-medium text-light-2">{label}</p>
    </div>
);

const Profile = () => {
    const { id } = useParams()
    const { pathname } = useLocation()

    // get current user id to check if on own profile page
    const { user: currentUser } = useUserContext()
    const { data: openUser, isPending: isLoadingUser } = useGetUserById(id || '')

    // to check if on liked posts page
    // if yes then change the tab color
    const isActive = pathname === `/profile/${id}/liked-posts`


    return (
        <>
            <div className="profile-container">
                <div className="lg:flex items-start justify-items-start w-full gap-x-20">

                    {/* Profile image div */}
                    <div className="flex xl:flex-row flex-col max-xl:items-center">
                        <img
                            src={openUser?.imageUrl || '/assets/icons/profile-placeholder.svg'}
                            alt="profile"
                            className=" w-28 h-28 lg:h-36 lg:w-36 rounded-full"
                        />
                    </div>

                    {/* user details div */}
                    <div className="flex flex-col justify-between md:mt-2">

                        {/* name, username, post number, following and follower div */}
                        <div className="flex flex-col w-auto">
                            <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-auto">
                                {openUser?.name}
                            </h1>
                            <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                                @{openUser?.username}
                            </p>
                        </div>

                        <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
                            <StatBlock value={openUser?.posts.length} label="Posts" />
                            <StatBlock value={0} label="Followers" />
                            <StatBlock value={0} label="Following" />
                        </div>

                        <p className="small-medium md:base-medium text-center xl:text-left mt-7 max-w-screen-sm">
                            {openUser?.bio}
                        </p>
                    </div>

                    {/* Edit profile and follow button div */}
                    <div className="flex justify-center gap-4">

                        {/* Conditional rendering for follow button and edit button */}
                        {openUser?.$id === currentUser.id ? (
                            <Link
                                to={`/update-profile/${currentUser.id}`}
                                className={`h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg`}>
                                <img
                                    src={"/assets/icons/edit.svg"}
                                    alt="edit"
                                    width={20}
                                    height={20}
                                />
                                <p className="flex whitespace-nowrap small-medium">
                                    Edit Profile
                                </p>
                            </Link>
                        ) : (
                            <Button type="button" className="shad-button_primary px-8">
                                Follow
                            </Button>
                        )}
                    </div>
                </div>

                {/* Div for posts tab and Liked posts tab */}
                <div className="profile-tab rounded-xl justify-evenly">
                    <Link
                        to={`/profile/${id}`}
                        className={`flex items-center gap-3 px-4 py-2 ${!isActive && 'bg-primary-500 rounded-xl'}`}
                    >
                        <img
                            src="/assets/icons/posts.svg"
                            alt="posts"
                            width={20}
                            height={20}
                            className={`${!isActive && 'invert-white'}`}
                        />
                        Posts
                    </Link>

                    {/* Visble if on own profile */}
                    <Link
                        to={`/profile/${id}/liked-posts`}
                        className={`flex items-center gap-3 px-4 py-2 ${isActive && 'bg-primary-500 rounded-xl'} ${currentUser.id !== openUser?.$id && 'hidden'}`}
                    >
                        <img
                            src="/assets/icons/like.svg"
                            alt="like"
                            width={20}
                            height={20}
                            className={`${isActive && 'invert-white'}`}
                        />
                        Liked
                    </Link>
                </div>
                
                {/* Loader */}
                {!openUser && isLoadingUser && <Loader />}

                <Routes>
                    <Route index element={<GridPostList posts={openUser?.posts} />} />
                    {currentUser.id === openUser?.$id && (
                        <Route path="liked-posts" element={<GridPostList posts={openUser?.liked} showStats={false} />} />
                    )}
                </Routes>
                <Outlet />
            </div>
        </>
    )
}

export default Profile