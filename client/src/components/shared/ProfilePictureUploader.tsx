import { useCallback, useState } from 'react'
import { FileWithPath, useDropzone } from 'react-dropzone'
type FileUploaderProps = {
    fieldChange: (FILES: File[]) => void;
    mediaUrl: string;
}

const ProfilePictureUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
    const [file, setFile] = useState<File[]>([])
    const [fileUrl, setFileUrl] = useState(mediaUrl)

    const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
        setFile(acceptedFiles)
        fieldChange(acceptedFiles)
        setFileUrl(URL.createObjectURL(acceptedFiles[0]))
    }, [file])

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.svg']
        }
    })

    return (
        <div {...getRootProps()}>
            <input {...getInputProps()} className='cursor-pointer' />
            {
                fileUrl &&
                <>
                    <div className='flex flex-1 justify-center items-center gap-7 p-5 lg:p-10 lg:justify-start'>
                        <img
                            src={fileUrl}
                            alt='image'
                            className='rounded-full cursor-pointer w-1/6 h-1/6'
                        />
                        <p className='cursor-pointer hover:text-blue-500'>Click to upload Profile Picture</p>
                    </div>
                </>
            }
        </div>
    )
}
export default ProfilePictureUploader