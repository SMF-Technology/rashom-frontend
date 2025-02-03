import Image from 'next/image'
import affiliate from '../../public/images/affiliate.png'
const Affiliate = () => {
  return (
    <div className="mx-auto container">
        <div className="grid grid-cols-1 md:grid-cols-2 p-10 gap-10">
            <div>
                <h1 className="mt-10 font-bold  md:text-xl lg:text-4xl uppercase  text-black"> Join our affiliate team </h1>
                <p className="text-[#5C5C5C] mt-5  lg:text-base md:text-sm "> Success in affiliate marketing is not just about selling products, 
                    it’s about building trust and providing value. 
                    When you help others find what they need, success will follow.</p>
                <button className="bg-[#D9D9D9] px-4 py-2 mt-5 font-semibold rounded-md  text-black">Get Started Today</button>
            </div>

            <div className='flex items-center'>
                <Image alt="affiliate" src={affiliate} className='mx-auto rounded-lg w-full  md:w-2/3 h-auto' />
            </div>
        </div>
    </div>
  )
}

export default Affiliate