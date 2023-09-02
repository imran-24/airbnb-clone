import Image from 'next/image';
import {useState, useCallback} from 'react'
import { useDropzone } from 'react-dropzone';
import { TbPhoto } from 'react-icons/tb';
interface ImageUploadProps{
    value?: string;
    disabled?: boolean;
    label: string;
    onChange: (base64: string)=> void;
}
const ImageUpload: React.FC<ImageUploadProps> = ({
    value, disabled, label, onChange
}) => {
  const [base64, setBase64] = useState(value)

  const handleChange = useCallback((base64: string)=>{
   onChange(base64)
  },[onChange])

  const handleDrop = useCallback((files: any)=>{
    const file = files[0]
    const reader = new FileReader()
    reader.onload = (e: any)=>{
        setBase64(e.target.result)
        onChange(e.target.result)
    }
    reader.readAsDataURL(file)
  },[handleChange])

  const { getRootProps, getInputProps } = useDropzone({ 
    maxFiles: 1, 
    onDrop: handleDrop, 
    disabled,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    } 
  });

  return (
    <div {...getRootProps({className: 'w-full h-[300px] p-4 text-white text-center border-2 border-dotted rounded-md border-neutral-400'})}>
      <input {...getInputProps()} />
      {base64  ? (
        <div className="flex items-center w-full h-full justify-center">
          <img
            src={base64}
            
            alt="Uploaded image"
            className='w-full h-full rounded-md object-cover'
          />
        </div>
      ) : (
        <div className='flex flex-col cursor-pointer items-center justify-center h-full w-full '>
          <TbPhoto size={24} className='fill-black'/>
          <p className="text-black">{label}</p>
        </div>
      )}
    </div>
  )
}

export default ImageUpload