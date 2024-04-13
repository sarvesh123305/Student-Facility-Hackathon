import React from 'react'

const NotificationItem = (item) => {
    const imageUrl =
        "data:image/jpeg;base64,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";

    const updateItem = () => {
        console.log(item.name)
    }
    return (
        <li class="py-3 sm:py-4 hover:bg-gray-100 p-3 hover:rounded-xl">
            <div class="flex items-center">
                <div class="flex-shrink-0 pr-5">
                    <img
                        class="w-8 h-8 rounded-full"
                        src={imageUrl}
                        alt="Neil image"
                    />
                </div>
                <div class="flex-1 min-w-0 ms-4">
                    <p class="text-md font-medium text-gray-900 truncate">
                        {item.mis + " "+ item.name}
                    </p>
                    <p class="text-md text-gray-500 truncate">
                        {item.dept}
                    </p>
                    {item.status === 'notApproved' ? (
    <div>
        <button className="m-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={updateItem}>Approve</button>
        <button className="m-1 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Reject</button>
    </div>
) : null}

                </div>
                <div class="inline-flex flex-col items-center text-base font-semibold text-gray-900">
                    {item.ay}
                    <span className="inline-flex items-center text-sm font-normal text-gray-500 p-3 ">
                        <svg
                            className="w-2.5 h-2.5 me-1 mr-2"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="m2 13.587 3.055-3.055A4.913 4.913 0 0 1 5 10a5.006 5.006 0 0 1 5-5c.178.008.356.026.532.054l1.744-1.744A8.973 8.973 0 0 0 10 3C4.612 3 0 8.336 0 10a6.49 6.49 0 0 0 2 3.587Z" />
                            <path d="m12.7 8.714 6.007-6.007a1 1 0 1 0-1.414-1.414L11.286 7.3a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.401.211.59l-6.007 6.007a1 1 0 1 0 1.414 1.414L8.714 12.7c.189.091.386.162.59.211.011 0 .021.007.033.01a2.981 2.981 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z" />
                            <path d="M17.821 6.593 14.964 9.45a4.952 4.952 0 0 1-5.514 5.514L7.665 16.75c.767.165 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z" />
                        </svg>
                        {item.programme}
                    </span>
                </div>
            </div>
        </li>
    )
}

export default NotificationItem