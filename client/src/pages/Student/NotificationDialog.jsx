import React from 'react'
import { Link } from 'react-router-dom';

const NotificationDialog = () => {
  const url = "data:image/jpeg;base64,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";

  return (
    <div id="dropdownNotification" className="p-2 max-w-sm absolute top-14 right-36 bg-white divide-y divide-gray-100 rounded-lg shadow" aria-labelledby="dropdownNotificationButton">
    <div className="block px-4 py-2 font-medium text-center text-gray-700 rounded-t-lg bg-gray-200 ">
      Notifications
    </div>
    <div className="divide-y divide-gray-200 ">
      <a href="#" className="flex px-4 py-3 hover:bg-gray-50 ">
        <div className="flex-shrink-0 pr-4">
          <img className="rounded-full w-11 h-11" src={url} alt="Jese image" />
          <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-blue-600 border border-white rounded-full ">
            <svg className="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
              <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
              <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
            </svg>
          </div>
        </div>
        <div className="w-full ps-3 ">
          <div className="text-gray-500 text-sm mb-1.5 ">New message from <span className="font-semibold text-gray-900 ">Jese Leos</span>: "Hey, what's up? All set for the presentation?"</div>
          <div className="text-xs text-blue-600 font-semibold">a few moments ago</div>
        </div>
      </a>
      <a href="#" className="flex px-4 py-3 hover:bg-gray-50 ">
        <div className="flex-shrink-0 pr-4">
          <img className="rounded-full w-11 h-11" src={url} alt="Jese image" />
          <div className="absolute flex items-center justify-center w-5 h-5 ms-6 -mt-5 bg-blue-600 border border-white rounded-full ">
            <svg className="w-2 h-2 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
              <path d="M1 18h16a1 1 0 0 0 1-1v-6h-4.439a.99.99 0 0 0-.908.6 3.978 3.978 0 0 1-7.306 0 .99.99 0 0 0-.908-.6H0v6a1 1 0 0 0 1 1Z" />
              <path d="M4.439 9a2.99 2.99 0 0 1 2.742 1.8 1.977 1.977 0 0 0 3.638 0A2.99 2.99 0 0 1 13.561 9H17.8L15.977.783A1 1 0 0 0 15 0H3a1 1 0 0 0-.977.783L.2 9h4.239Z" />
            </svg>
          </div>
        </div>
        <div className="w-full ps-3 ">
          <div className="text-gray-500 text-sm mb-1.5 ">New Notification related to <span className="font-semibold text-gray-900 ">Scholarship</span>: "Hey, what's up? All set for the presentation?"</div>
          <div className="text-xs text-blue-600 font-semibold">a few moments ago</div>
        </div>
      </a>
    </div>
    <a href="#" class="block py-2 text-sm font-medium text-center text-gray-900 rounded-b-lg bg-gray-200 hover:bg-gray-150 ">
      <div class="inline-flex items-center ">
        <svg class="w-4 h-4 mr-2 me-2 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
          <path d="M10 0C4.612 0 0 5.336 0 7c0 1.742 3.546 7 10 7 6.454 0 10-5.258 10-7 0-1.664-4.612-7-10-7Zm0 10a3 3 0 1 1 0-6 3 3 0 0 1 0 6Z" />
        </svg>
        <Link
            to={"/notifications"}
          >
                  View all
          </Link>
          
      </div>
    </a>
  </div>
  )
}

export default NotificationDialog