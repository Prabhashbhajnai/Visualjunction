import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Models } from "appwrite"
import { useNavigate } from "react-router-dom"

// Components
import { useToast } from "../ui/use-toast"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import FileUploader from "../shared/FileUploader"

// Validation
import { PostValidation } from "@/lib/validation"

// Query and Mutations
import { useCreatePost, useUpdatePost } from "@/lib/react-query/queriesAndMutations"

// Context
import { useUserContext } from "@/context/AuthContext"


type PostFormProps = {
    post?: Models.Document
    action: 'Create' | 'Update'
}

const PostForm = ({ post, action }: PostFormProps) => {
    const { mutateAsync: createPost, isPending: isLoadingCreate } = useCreatePost()

    const { mutateAsync: updatePost, isPending: isLoadingUpdate } = useUpdatePost()

    const { user } = useUserContext()
    const { toast } = useToast()
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            caption: post ? post?.caption : "",
            file: [],
            location: post ? post?.location : "",
            tags: post ? post?.tags.join(',') : "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof PostValidation>) {
        if (post && action === 'Update') {
            const updatedPost = await updatePost({
                ...values,
                postId: post.$id,
                imageId: post?.imageId,
                imageUrl: post?.imageUrl
            })

            if (!updatedPost) {
                toast({
                    title: "Please Try Again",
                })
            }

            return navigate(`/posts/${post.$id}`)
        }


        const newPost = await createPost({
            ...values,
            userId: user.id
        })

        if (!newPost) {
            toast({
                title: "Please Try Again",
            })
        }

        navigate('/')
    }

    console.log(post?.imageUrl);


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">

                {/* Caption */}
                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Caption</FormLabel>
                            <FormControl>
                                <Textarea className="shad-textarea custom-scrollbar" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                {/* File Upload */}
                <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Photos</FormLabel>
                            <FormControl>
                                <FileUploader
                                    fieldChange={field.onChange}
                                    mediaUrl={post?.imageUrl}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                {/* Location */}
                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Location</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                {/* Tags */}
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Tags (seperated by comma ',')</FormLabel>
                            <FormControl>
                                <Input
                                    type="text"
                                    className="shad-input"
                                    placeholder="JS, React, NextJs"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

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
                        disabled={isLoadingCreate || isLoadingUpdate}
                    >
                        {isLoadingCreate || isLoadingUpdate && 'Loading...'}
                        {action} Post
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default PostForm