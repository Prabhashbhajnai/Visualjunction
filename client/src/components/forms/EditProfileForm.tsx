import { useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Models } from "appwrite"

// Validation
import { ProfileValidation } from "@/lib/validation"

// Query and Mutations
import { useUpdateProfile } from "@/lib/react-query/queriesAndMutations"

// Components
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import ProfilePictureUploader from "../shared/ProfilePictureUploader"
import { toast } from "../ui/use-toast"
import Loader from "../shared/Loader"

type UserProfileProps = {
    user?: Models.Document
}

const EditProfileForm = ({ user }: UserProfileProps) => {
    const navigate = useNavigate()
    console.log(user);
    

    const { mutateAsync: updateProfile, isPending: isLoadingUpdate } = useUpdateProfile()

    // 1. Define your form.
    const form = useForm<z.infer<typeof ProfileValidation>>({
        resolver: zodResolver(ProfileValidation),
        defaultValues: {
            file: [],
            name: user ? user?.name : "",
            username: user ? user.username : "",
            bio: user ? user.bio : "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof ProfileValidation>) {
        const updatedProfile = await updateProfile({
            ...values,
            userId: user?.$id || "",
            imageId: user?.imageId,
            imageUrl: user?.imageUrl
        })

        console.log(updatedProfile);


        if (!updatedProfile) {
            toast({
                title: "Please Try Again",
            })
        }

        navigate(`/profile/${user?.$id}`)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">

                {/* Profile Picture */}
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <ProfilePictureUploader
                                    fieldChange={field.onChange}
                                    mediaUrl={user?.imageUrl}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                {/* Name */}
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field} />
                            </FormControl>
                        </FormItem>
                    )}
                />

                {/* Bio */}
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Bio</FormLabel>
                            <FormControl>
                                <Textarea className="shad-textarea custom-scrollbar" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                {/* Buttons */}
                <div className="flex gap-4 items-center justify-end">
                    <Button
                        type="button"
                        className="shad-button_dark_4"
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        className="shad-button_primary whitespace-nowrap"
                        disabled={isLoadingUpdate}
                    >
                        {isLoadingUpdate && <Loader />}
                        Update Profile
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default EditProfileForm