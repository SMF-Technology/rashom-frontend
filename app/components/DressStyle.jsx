
import casual from '../../public/images/casual.png'
import formal from '../../public/images/formal.png'
import party from '../../public/images/party.png'
import gym from '../../public/images/gym.png'
import Image from 'next/image';
import Link from 'next/link';

const DressStyle = () => {
    return (
        <div className="bg-[#F2F2F2]">
            <div className="container mx-auto pb-5">

                <h1 className="font-bold text-lg md:text-4xl pt-10 text-center mb-5 uppercase text-black">Browse By Dress Style</h1>
                <div className="grid grid-cols-2  sm:grid-cols-2 gap-10 p-5">
                  <Link href="/tag-product/casual">
                  <div className='relative'>
                    <Image  alt='dress-style' src={casual} className='w-full mx-auto flex h-[100px] md:h-[200px] lg:h-[300px] rounded-xl shadow-lg' />
                    <p className='absolute top-4 text-black font-bold text-2xl left-5'>Casual</p>
                  </div>

                  </Link>
                  <Link href="/tag-product/formal">
                  <div className='relative'>
                    <Image  alt='dress-style' src={formal} className='w-full mx-auto flex h-[100px] md:h-[200px] lg:h-[300px] rounded-xl shadow-lg' />
                    <p className='absolute top-4 text-black font-bold text-2xl left-5'>Formal</p>
                  </div>
                  </Link>
                  <Link href="/tag-product/party">
                  <div className='relative'>
                    <Image  alt='dress-style' src={party} className='w-full mx-auto flex h-[100px] md:h-[200px] lg:h-[300px] rounded-xl shadow-lg' />
                    <p className='absolute top-4 text-black font-bold text-2xl left-5'>Party</p>
                  </div>
                  </Link>
                  <Link href="/tag-product/gym">
                  <div className='relative'>
                    <Image  alt='dress-style' src={gym} className='w-full mx-auto flex h-[100px] md:h-[200px] lg:h-[300px] rounded-xl shadow-lg' />
                    <p className='absolute top-4 text-black font-bold text-2xl left-5'>Gym</p>
                  </div>
                  </Link>
                </div>

                  {/* Casual Style Card */}

                  {/* <div className='grid grid-cols-12 gap-5 p-5'>
                    <div className='col-span-12 md:col-span-5 '>
                        <div className='relative'>
                        <img src={casual} className='flex mx-auto h-[250px]' />
                        <p className='absolute top-4 text-black font-bold text-2xl left-32'>Casual</p>
                        </div>
                    </div>
                    <div className='col-span-12 md:col-span-7 '>
                    <div className='relative'>
                        <img src={formal} className='flex mx-auto h-[250px]' />
                        <p className='absolute top-4 text-black font-bold text-2xl left-32'>Formal</p>
                        </div>
                    </div>
                  </div> */}

            </div>
        </div>
    );
};

export default DressStyle;