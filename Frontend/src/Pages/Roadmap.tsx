import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { Navbar } from "../Components/Navbar";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_ALL_FLOWCHARTS } from "../graphql/query/roadmapQuery";

interface FlowchartType {
  _id: string;
  title: string;
  nodes: { label: string;
    time: string;
    links: string[];
    tips: string;
   }[];
}

const Roadmap: React.FC = () => {
  const { data, loading, error } = useQuery<{ getAllFlowcharts: FlowchartType[] }>(GET_ALL_FLOWCHARTS);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [flowcharts, setFlowcharts] = useState<FlowchartType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setFlowcharts(data.getAllFlowcharts);
    }
  }, [data]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const redirectToFlowchartDetails = (flowchart: any) => {
    navigate(`/roadmaps/${flowchart._id}`, {
      state: {
        title: flowchart.title,
        nodes: flowchart.nodes,
        viewOnly: true
      }
    });
  };

  const filteredFlowcharts = flowcharts.filter((flowchart) =>
    flowchart.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <>
      <Navbar />
      <div className="bg-white dark:border-b-slate-700 dark:bg-background min-h-screen text-2xl text-slate-200">
        <div className="p-4">
          <h1 className="text-4xl mb-4 ml-40 text-black dark:text-white font-semibold">
            Flowcharts ({filteredFlowcharts.length})
          </h1>
          <div className="flex justify-center items-center mb-10 p-5 mx-40 bg-white dark:border-b-slate-700 dark:bg-background rounded-xl shadow-xl">
            <div className="relative w-full">
              <FaSearch className="absolute left-3 top-3 text-black dark:text-white" />
              <input
                type="text"
                placeholder="Search flowcharts..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="pl-10 p-2 text-black w-full rounded-xl bg-white dark:border-b-slate-700 dark:bg-background border border-gray-300"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mx-40">
            {filteredFlowcharts.map((flowchart) => (
              <div
                key={flowchart._id}
                className="bg-white border-2 dark:border-b-slate-700 dark:bg-background text-textmain font-bold font-royal4 p-8 rounded-lg shadow-lg cursor-pointer"
                onClick={() => redirectToFlowchartDetails(flowchart)}
              >
                <h2 className="text-3xl mb-2">{flowchart.title}</h2>
                <p className="text-lg">
                  Nodes: {flowchart.nodes.length}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Roadmap;
