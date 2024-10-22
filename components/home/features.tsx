import Image from "next/image";

export default function Features(){
    return (
        <section className="mt-10 bg-gray-50 dark:bg-gray-800">
            <div className="max-w-screen-xl px-4 py-8 mx-auto space-y-12 lg:space-y-20 lg:py-24 lg:px-6">

                <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
                    <div className="text-gray-500 sm:text-lg dark:text-gray-400">
                        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            Organize with Smart Labels
                        </h2>
                        <p className="mb-8 font-light lg:text-xl">
                        Keep your thoughts in order effortlessly. Use smart labels to categorize your notes, making it simple to group related information and access what you need quickly. Stay organized and focused on your ideas without the hassle of searching.
                        </p>

                        <ul role="list" className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700">
                            <li className="flex space-x-3">

                                <svg className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor"
                                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"></path>
                                </svg>
                                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Unlimited Labels</span>
                            </li>
                            <li className="flex space-x-3">

                                <svg className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor"
                                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"></path>
                                </svg>
                                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Filter with Labels</span>
                            </li>
                        </ul>
                    </div>
                    <Image className="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex" width={90} height={90} src="/labels.gif" alt="dashboard feature image" />
                </div>

                <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
                    <Image className="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex" width={90} height={90} src="/rich-editor.gif" alt="feature image 2" />
                    <div className="text-gray-500 sm:text-lg dark:text-gray-400">
                        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            Create with a Rich Text Editor
                        </h2>
                        <p className="mb-8 font-light lg:text-xl">
                            Easily format your notes to make them stand out. With our rich text editor, you can add headings, bullet points, and images, transforming plain text into visually engaging content that enhances readability and clarity.
                        </p>

                        <ul role="list" className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700">
                            <li className="flex space-x-3">

                                <svg className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor"
                                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"></path>
                                </svg>
                                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Full rich text editor with text styling and images.</span>
                            </li>
                            <li className="flex space-x-3">

                                <svg className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor"
                                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"></path>
                                </svg>
                                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Enhance your notes by adding images.</span>
                            </li>
                            <li className="flex space-x-3">

                                <svg className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor"
                                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"></path>
                                </svg>
                                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Automatic saving so you don't lose any data.</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="items-center gap-8 lg:grid lg:grid-cols-2 xl:gap-16">
                    <div className="text-gray-500 sm:text-lg dark:text-gray-400">
                        <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                            Get Help from Our AI Assistant
                        </h2>
                        <p className="mb-8 font-light lg:text-xl">
                            Enhance your note-taking experience with the support of an AI assistant. Whether you need to brainstorm ideas or receive editing suggestions, the AI offers personalized insights to streamline your writing process and boost your efficiency.
                        </p>

                        <ul role="list" className="pt-8 space-y-5 border-t border-gray-200 my-7 dark:border-gray-700">
                            <li className="flex space-x-3">
                                <svg className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor"
                                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"></path>
                                </svg>
                                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Quick Information Retrieval</span>
                            </li>
                            <li className="flex space-x-3">

                                <svg className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor"
                                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"></path>
                                </svg>
                                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Smart Editing Suggestion</span>
                            </li>
                            <li className="flex space-x-3">

                                <svg className="flex-shrink-0 w-5 h-5 text-purple-500 dark:text-purple-400" fill="currentColor"
                                    viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                        clipRule="evenodd"></path>
                                </svg>
                                <span className="text-base font-medium leading-tight text-gray-900 dark:text-white">Personalized Insights</span>
                            </li>
                        </ul>
                    </div>
                    <Image className="hidden w-full mb-4 rounded-lg lg:mb-0 lg:flex" width={90} height={90} src="/ai-assistant.gif" alt="dashboard feature image" />
                </div>
            </div>
        </section>
    )
}