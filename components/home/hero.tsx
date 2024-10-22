import Image from "next/image";
import Link from "next/link";

export default function Hero(){
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="grid max-w-screen-xl px-4 pt-20 pb-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12 lg:pt-28">
                <div className="mr-auto place-self-center lg:col-span-7">
                        <h1
                            className="max-w-2xl mb-4 text-4xl font-extrabold leading-none tracking-tight md:text-5xl xl:text-6xl dark:text-white">
                            Write Smart,<br /> Edit Smarter with <span className="text-blue-600">AI.</span>
                        </h1>
                        <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
                            Effortlessly Create, Organize, and Enhance Your Notes with a Rich Text Editor, Smart Labels, and AI Assistance.    
                        </p>
                        <div className="space-y-4 sm:flex sm:space-y-0 sm:space-x-4">
                            <Link 
                                href="/login"
                                className="inline-flex items-center justify-center w-full px-5 py-3 text-sm font-medium text-center text-white bg-blue-600 hover:bg-blue-700 rounded-lg sm:w-auto focus:ring-4 focus:ring-gray-100 "
                            >
                                Start Now
                            </Link>
                        </div>
                </div>
                <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
                    <Image 
                        src="/hero.svg"
                        alt="hero image"
                        width={80}
                        height={80}
                        className="w-full h-full"
                    />
                </div>
            </div>
        </section>
    )
}