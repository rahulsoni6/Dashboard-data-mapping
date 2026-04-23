import { useEffect, useState } from "react";
import useDebouncedSearch from "../hooks/useDebouncedSearch";

const Dashboard = () => {
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [searchedText, setSearchedText] = useState("");
  const [columnVisible, setcolumnVisible] = useState({
    Name: true,
    Age: true,
    Email: true,
  });

  const useDebounceSearch = useDebouncedSearch(searchedText, 500);

  const fetchUsers = async (query = "") => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://dummyjson.com/users?${query}`);
      const data = await response.json();
      console.log(data);
      setUserData(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    const query = `skip=${page * 30}&search?q=${useDebounceSearch}`;
    fetchUsers(query);
  }, [page, useDebounceSearch]);

  console.log("usersd userDatata ", userData);
  const handlePrevClick = () => {
    setPage((prev) => prev - 1);
  };
  const handleNextClick = () => {
    setPage((prev) => prev + 1);
  };

  return (
    <>
      {isLoading ? <div>Loading....</div> : null}
      <input type="search" onChange={(e) => setSearchedText(e.target.value)} />
      {/* <Search text={searchedText} /> */}
      {userData?.users?.length ? (
        <table>
          <tbody>
            <th>ID</th>
            {columnVisible["Name"] ? <th>Name</th> : null}

            <th>Age</th>
            <th>Email</th>
            {userData?.users?.map((i) => (
              <tr>
                <td>{i?.id}</td>
                {columnVisible["Name"] ? (
                  <td>
                    {i?.firstName} {i?.lastName}{" "}
                  </td>
                ) : null}

                <td>{i?.age}</td>
                <td>{i?.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      {userData?.users?.length ? (
        <div>
          {"Counting :- "}
          {userData?.users?.[0]?.id} to{" "}
          {userData?.users?.[userData?.users?.length - 1]?.id} of{" "}
          {userData?.total}{" "}
        </div>
      ) : null}
      <div>
        <button style={{ margin: "8px" }} onClick={handlePrevClick}>
          Prev
        </button>
        <button style={{ margin: "8px" }} onClick={handleNextClick}>
          Next
        </button>
      </div>
      <div>
        <h2>Should Visible or Not : </h2> Name{" "}
        <input
          type="checkbox"
          checked={columnVisible["Name"]}
          onChange={(e) =>
            setcolumnVisible({
              ...columnVisible,
              Name: !columnVisible["Name"],
            })
          }
        />
      </div>
    </>
  );
};

export default Dashboard;
