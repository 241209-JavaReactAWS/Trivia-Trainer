import { SyntheticEvent, useState } from "react";

function Search() {
  const [searchType, setSearchType] = useState<string>("");
  const [searchParam, setSearchParam] = useState<string>("");

  let search = () => {
    console.log("Searching");
  }

  return (
    <div>
      <h1>Search Test</h1>

      <div>
        <label htmlFor="nameInput">Search by name</label>{" "}
        <input
          id="nameInput"
          type="radio"
          name="searchType"
          value="name"
          onClick={(e: SyntheticEvent) => {
            setSearchType((e.target as HTMLInputElement).value);
          }}
        />
        <br />

        <label htmlFor="categoryInput">Search by description</label>{" "}
        <input
          id="categoryInput"
          type="radio"
          name="searchType"
          value="description"
          onClick={(e: SyntheticEvent) => {
            setSearchType((e.target as HTMLInputElement).value);
          }}
        />
      </div>

      <br></br>

      <label>
        {/*Whenever the text inside the username or password fields change, it will update the state variable*/}
        Search Parameter:{" "}
        <input
          type="text"
          id="searchParamInput"
          value={searchParam}
          onChange={(e: SyntheticEvent) => {
            setSearchParam((e.target as HTMLInputElement).value);
          }}
        />
      </label>
      {/* <label>
        Course Topic:{" "}
        <input
          type="text"
          id="topicField"
          value={searchTopicParam}
          onChange={(e: SyntheticEvent) => {
            setSearchTopicParam((e.target as HTMLInputElement).value);
          }}
        />
      </label> */}
      <br></br>
      <br></br>
      <button onClick={search}>Search</button>
    </div>
  );
}

export default Search;
