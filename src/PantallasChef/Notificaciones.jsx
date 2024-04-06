import { React } from 'react'
import { Button, Navbar, Card } from 'flowbite-react'

function Notificaciones() {

  return (
    <div className="h-screen ">
      <div className="container-cards flex items-start" style={{ height: 'auto', marginTop: '2%' }}>
        {/* Contenedor para las cards */}
        <div className="flex flex-col items-center" style={{ width: '100%'}}>
          <Card
            className="max-w-screen-sm w-full mb-4"
            imgAlt="Meaningful alt text for an image that is not purely decorative"
            imgSrc="/images/blog/image-1.jpg"
          >
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Noteworthy technology acquisitions 2021
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
            </p>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Notificaciones
