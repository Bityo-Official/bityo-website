import Link from 'next/link';

const Footer = () => {
  return (
    <>
      <hr className='border-gray-300 dark:border-1 dark:border-gray-100' />
      <div className="pt-2 pb-2 gap-8">
        {/* Copyright */}
        <div className='flex gap-3 justify-center'>
          <p className='text-gray-600 dark:text-gray-300'>© 幣友 Bityo. 2024</p>
          <p className='text-gray-300 dark:text-gray-300 hidden sm:block'>|</p>
          <p className='text-gray-600 dark:text-gray-300 hidden sm:block'>All Rights Reserved</p>
        </div>
      </div>
    </>
  )
}

export default Footer;
