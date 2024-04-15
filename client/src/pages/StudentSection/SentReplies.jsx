import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import {
  initialLoadUser,
  getAllQueries,
} from "../../redux/actions/studentSection";
import QueryItem from "./QueryItem";

const SentReplies = ({
  studentsection: { queries },
  initialLoadUser,
  getAllQueries,
}) => {
  useEffect(() => {
    initialLoadUser();
  }, []);

  const [data, setData] = useState(queries);

  // const fetchData = async () => {};
  useEffect(() => {
    getAllQueries();
  }, [queries]);

  useEffect(() => {
    setData(queries);
  }, [queries]);
 

  return (
    <div className="w-full p-4 bg-white border-gray-200 rounded-lg shadow sm:p-8">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900">
          Sent Replies
        </h5>
      
        <div
          className="p-4 text-md text-blue-800 rounded-full bg-blue-50"
          role="alert"
        >
          <span className="font-medium">
            {data && data.length > 0 && data.length} Queries
          </span>
        </div>
      </div>
      <div className="flow-root">
        <ul role="list" className="divide-y divide-gray-200">
          {data && data.length > 0 && data.map(item => (
            item.reply  ?
            <QueryItem key={item._id} query={item.query} type={item.type} from={item.from} to={item.to} imageUrl={item.imageUrl} status={item.status} reply={item.reply} />
            : null))}

        </ul>
      </div>
    </div>
  );
};
const mapStateToProps = (state) => ({
  studentsection: state.studentsection,
});

export default connect(mapStateToProps, {
  initialLoadUser,
  getAllQueries,
})(SentReplies);
