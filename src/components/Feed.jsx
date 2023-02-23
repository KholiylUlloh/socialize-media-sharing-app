import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { client } from "../client";
import MasonryLayout from "./masonryLayout";
import Spinner from "./Spinner";
import { feedQuery, searchQuery } from "../utils/userdata";

const Feed = () => {
  const [pins, setPins] = useState();
  const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    if (categoryId) {
      setLoading(true);
      const query = searchQuery(categoryId);
      client.fetch(query).then((data) => {
        setPins(data);
        setLoading(false);
      });
    } else {
      setLoading(true);

      client.fetch(feedQuery).then((data) => {
        setPins(data);
        setLoading(false);
      });
    }
  }, [categoryId]);
  const ideaName = categoryId || "new";
  if (loading) {
    return <Spinner message={`Adding ${ideaName} ideas to your feed!`} />;
  }
  return <div>{pins?.length ? <MasonryLayout pins={pins} /> : <h1 className="w-full h-full flex items-center justify-center font-sans text-lg mt-10 ">No Pins Found in {ideaName}</h1>}</div>;
};

export default Feed;
