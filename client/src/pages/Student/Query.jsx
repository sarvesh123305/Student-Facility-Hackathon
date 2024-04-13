import { Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import { Listbox } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/20/solid";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { db, storage } from "../../utils/useFirebase";
import {
  sendQuery,
  getQueries,
  initialLoadUser,
} from "../../redux/actions/logActions";
import { connect } from "react-redux";
import { Upload } from "lucide-react";

const relatedOptions = [
  {
    id: 1,
    name: "Select",
  },
  {
    id: 2,
    name: "Scholarship",
  },
  {
    id: 3,
    name: "Bonafide",
  },
  {
    id: 4,
    name: "Fund related ",
  },
  {
    id: 5,
    name: "Scholarship not accepted",
  },
  {
    id: 6,
    name: "Deadline exceed",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Query = ({
  student: { studentDetails, queries },
  sendQuery,
  getQueries,
  initialLoadUser,
}) => {
  // const [selected, setSelected] = useState(relatedOptions[0]);
  const [message, setMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    //query type
    sendQuery({
      query: message,
      type: selected.name,
      to: "Students Section",
      from: studentDetails._id,
      image: image,
    });
  };
  const handleMessage = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    initialLoadUser();
  }, []);
  useEffect(() => {
    // console.log(queries);
    getQueries();
  }, [queries]);

  // const [image, setImage] = useState("");
  // const handleSupportingdocs = (e) => {
  //   var reader = new FileReader();
  //   reader.readAsDataURL(e.target.files[0]);
  //   reader.onload = () => {
  //      setImage(reader.result);
  //   };
  //   reader.onerror = (error) => {
  //     console.log(error);
  //   };
  // };

  // const handleUpload = async () => {
  //     try {
  //         const formData = new FormData();
  //         formData.append('image', file);

  //         await axios.post('http://localhost:5000/api/student/upload', formData, {
  //           headers: {
  //             'Content-Type': 'multipart/form-data',
  //           },
  //         });
  //         alert('Image uploaded successfully');

  //     } catch (error) {
  //         console.error('Error uploading image:', error);
  //         alert('Error uploading image');
  //     }
  // };

  // function uploadImage(){
  //   fetch("http://localhost:5000/api/student/upload", {
  //     method: "POST",
  //     crossDomain: true,
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //       "Access-Control-Allow-Origin":"*",
  //     },
  //     body: JSON.stringify({
  //       base64: image,
  //     }),
  //   }).then((res) => res.json()).then((data) => console.log(data))
  // }

  const [imageUpload, setImageUpload] = useState(null);
  const uploadFile = (e) => {
    e.preventDefault();
    if (imageUpload === null) {
      console.log("Please select an image");
      return;
    }
    const imageRef = storageRef(storage, students / sample.png);

    uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref)
          .then((url) => {
            // saveData(url);
            console.log("image saved ", url);
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  return (
    <div className="isolate bg-white px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Drop Your Query
        </h2>
      </div>

      <hr className="mt-5" />
      <form className="mx-auto mt-16 max-w-xl sm:mt-10">
        <div className="mx-auto max-w-2xl text-center">
          <i className="text-red-500">
            Please read FAQ before sending the query
          </i>
        </div>
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          {/* <Listbox value={selected} onChange={setSelected}>
            {({ open }) => (
              <>
                <div className="relative mt-2">
                  <Listbox.Label className="block text-sm font-semibold leading-6 text-gray-900 my-3">
                    Related to
                  </Listbox.Label>
                  <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 sm:text-sm sm:leading-6">
                    <span className="flex items-center">
                      <span className="ml-3 block truncate">
                        {selected.name}
                      </span>
                    </span>
                    <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
                      <ChevronUpDownIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </span>
                  </Listbox.Button>

                  <Transition
                    show={open}
                    as={Fragment}
                    leave="transition ease-in duration-100"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <Listbox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {relatedOptions.map((person) => (
                        <Listbox.Option
                          key={person.id}
                          required
                          className={({ active }) =>
                            classNames(
                              active
                                ? "bg-blue-700 text-white"
                                : "text-gray-900",
                              "relative cursor-default select-none py-2 pl-3 pr-9"
                            )
                          }
                          value={person}
                        >
                          {({ selected, active }) => (
                            <>
                              <div className="flex items-center">
                                <span
                                  className={classNames(
                                    selected ? "font-semibold" : "font-normal",
                                    "ml-3 block truncate"
                                  )}
                                >
                                  {person.name}
                                </span>
                              </div>

                              {selected ? (
                                <span
                                  className={classNames(
                                    active ? "text-white" : "text-blue-700",
                                    "absolute inset-y-0 right-0 flex items-center pr-4"
                                  )}
                                >
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </Transition>
                </div>
              </>
            )}
          </Listbox> */}
          <div className="sm:col-span-2">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Query
            </label>
            <textarea
              id="message"
              rows="4"
              name="message"
              values={message}
              onChange={handleMessage}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500  "
              placeholder="Write your query here..."
              defaultValue={""}
              required
            ></textarea>{" "}
          </div>
        </div>
        <div class=" max-w-screen-lg flex flex-row mx-auto mt-5 ">
          <div class="flex w-full mx-auto flex-col justify-center ">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 "
            >
              Upload Supporting Documents
            </label>
            <div class=" max-w-screen-lg flex flex-row  ">
              {/* {image === "" ? (
                ""
              ) : (
                <img
                  width={100}
                  class="  rounded-md"
                  src={image}
                  alt="image description"
                />
              )} */}
              <div class="flex w-full mx-auto flex-col justify-center ml-5">
                <label
                  class="block mb-2 text-sm font-medium text-gray-900 "
                  for="file_input"
                >
                  Update Profile Photo
                </label>
                <a
                  id="downloadLink"
                  href="https://firebasestorage.googleapis.com/v0/b/student-facility.appspot.com/o/students%2Fsample.png?alt=media&token=116ea86c-05a8-441e-a14c-60b1c6a91642"
                >
                  Download PDF
                </a>
                <input
                  class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none "
                  aria-describedby="file_input_help"
                  id="file_input"
                  accept="/"
                  // onChange={handleFileChange}
                  // onChange={handleSupportingdocs}
                  onChange={(e) => {
                    setImageUpload(e.target.files[0]);
                  }}
                  type="file"
                />
                <p class="mt-1 text-lg text-gray-500 " id="file_input_help">
                  PNG, JPG (MAX. 800x400px).
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            // onClick={handleUpload}
            onClick={uploadFile}
            className="block w-full rounded-md bg-blue-700 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Submit
          </button>
        </div>
      </form>

      <div>
        <div className="p-5 border border-gray-100 rounded-lg bg-gray-50 mt-10">
          <time className="text-lg font-semibold text-gray-900 ">
            Present Queries
          </time>
          <ol className="mt-3 divide-y divider-gray-200">
            {queries?.map((query, index) => (
              <div key={index}>
                <li>
                  <a
                    href="#"
                    className="items-center block p-3 sm:flex hover:bg-gray-100"
                  >
                    <img
                      className="w-12 h-12 mb-3 me-3 rounded-full sm:mb-0"
                      src={
                        query.image
                          ? query.image
                          : "data:image/jpeg;base64,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"
                      }
                      alt="Laura Romeros image"
                    />
                    <div className="text-gray-600 p-5">
                      <div className="text-base font-normal">
                        <span className="font-medium text-gray-900">
                          You have sent
                        </span>{" "}
                        query related to{" "}
                        <span className="font-medium text-gray-900 ">
                          {query.type}
                        </span>{" "}
                        as{" "}
                        <span className="font-medium text-gray-900 ">
                          "{query.query}"
                        </span>
                      </div>
                      <div className="text-sm font-normal">
                        {new Date(query.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                          second: "numeric",
                          timeZone: "UTC",
                        })}
                      </div>
                      <span className="inline-flex items-center text-xs font-normal text-gray-500 p-3 ">
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
                        Private
                      </span>
                      <br></br>
                      <div
                        className="inline-flex items-center p-4 mb-4 text-sm text-yellow-800 border border-yellow-300 rounded-lg bg-yellow-50 w-100 "
                        role="alert"
                      >
                        <svg
                          className="flex-shrink-0 inline w-4 h-4 me-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                          <span className="font-medium ml-3">
                            Status : Pending{" "}
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                </li>
              </div>
            ))}
          </ol>
        </div>
        <div></div>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  student: state.student,
});
export default connect(mapStateToProps, {
  sendQuery,
  getQueries,
  initialLoadUser,
})(Query);
