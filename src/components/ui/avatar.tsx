/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'

export const Avatar = ({name, lastname, email, imagePath}: {name:string,lastname:string, email:string, imagePath?:string }) => {
    const srcPath = imagePath !== ''?imagePath:'/images/avatarnotfound.webp'


  return (
    <div className="flex items-center space-x-4">
      <span className="relative flex shrink-0 overflow-hidden rounded-full h-8 w-8">
        <img
          className="aspect-square h-full w-full"
          alt="Image"
          src={srcPath}
        />
      </span>
      <div>
        <p className="text-sm font-normal leading-none">
          {lastname?lastname:'Apellido'}, {name?name:'Nombre'}
        </p>
        <p className="text-xs text-muted-foreground">
          <Link href={`mailto:${email}`}>{email?email:'mail@mail.com'}</Link>
        </p>
      </div>
    </div>
  )
}
