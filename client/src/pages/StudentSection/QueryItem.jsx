import React , {useState} from 'react'
import axios from 'axios'
import { connect } from "react-redux";
import { updateQueryItem } from '../../redux/actions/studentSection';
import { MdAirlineSeatLegroomReduced } from 'react-icons/md';
const QueryItem = ({
    studentsection: { queries },
    updateQueryItem,
    key,
    query,
    to,
    from,
    imageUrl,
    reply,
    type,
    status,
}) => {
    console.log(reply)  
    const url =
        "data:image/jpeg;base64,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";

       
        const RejectItem = async () => {
            const data = {
                query,
                to,
                from,
                imageUrl,
                reply: "",
                type,
                status: "Rejected"
            }
            updateQueryItem(data)
            setModalToggle(false);
        };
        const [modalToggle, setModalToggle] = useState(false);
        const [text, setText] = useState("")
        
        const handleChange = (e) => {
          setText(e.target.value)
        }
      
        const send = () => {
            const data = {
                query,
                to,
                from,
                imageUrl,
                reply: text,
                type,
                status: "Replied"
            }
            console.log(data)
            updateQueryItem(data)
            setModalToggle(false);
        }

        const replyItem = async () => {
            
            setModalToggle(true)
        };
    

    return (
       
  
        
        <li class="py-3 sm:py-4 hover:bg-gray-100 p-3 hover:rounded-xl">
            <div class="flex items-center">
                <div class="flex-shrink-0 pr-5">
                    <img
                        class="w-8 h-8 rounded-full"
                        src={url}
                        alt="Neil image"
                    />
                </div>
                {
            modalToggle ? <div id="popup-modal" tabindex="-1" class=" z-10 absolute top-1/3 right-1/3 justify-center items-center  ">
            <div class="relative p-4 w-full max-w-md max-h-full">
              <div class="relative bg-white rounded-lg shadow p-6 ">
                <button type="button" onClick={() => setModalToggle(!modalToggle)} class="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-hide="popup-modal">
                  <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                  </svg>
                </button>
                <div class="p-4 md:p-5 text-center ">
  
                  <label for="message" class="block mb-2 text-sm font-medium text-gray-900 ">Your Reply</label>
                  <textarea value={text} onChange={handleChange} id="message" rows="4" class="block p-2.5 mb-8 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Write your thoughts here..."></textarea>
  
                  <button data-modal-hide="popup-modal" type="button" onClick={send} class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center">
                    Send
                  </button>
                  <button data-modal-hide="popup-modal" type="button" onClick={() => setModalToggle(!modalToggle)} class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 ">Close</button>
                </div>
              </div>
            </div>
          </div> : null 
          }
  
                <div class="flex-1 min-w-0 ms-4">
                    <p class="text-md font-medium text-gray-900 truncate">
                        {query}
                    </p>
                    <p class="text-md text-gray-500 truncate">
                        {"from : " + from}
                    </p>
                    {status === 'Pending' && (
                        <div>
                            <button className="m-1 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={replyItem}>Reply</button>
                            <button className="m-1 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900" onClick={RejectItem}>Reject</button>
                        </div>
                    )
                    }
                    {status === 'Replied' && <div class="w-24 p-2 mb-1 mt-1 text-sm text-green-800 rounded-full bg-green-50 " role="alert">
                        <span class="ml-1 font-medium">Replied</span>
                    </div>
                    }

                    {
                        status === 'Rejected' && <div class="w-24 p-2 mb-1 mt-1 text-sm text-red-800 rounded-full bg-red-50 " role="alert">
                            <span class="ml-1 font-medium">Rejected</span>
                        </div>
                    }

                </div>
                <div class="inline-flex flex-col items-center text-base font-semibold text-gray-900">
                {"Related To: " + type} 
                    <span className="inline-flex items-center text-sm font-normal text-gray-500 p-3 ">

                    </span>
                </div>
            </div>


        </li>
    )
}

const mapStateToProps = (state) => ({
    studentsection: state.studentsection,
});

export default connect(mapStateToProps, { updateQueryItem })(
    QueryItem
);
