import React, { Component } from "react";
import { Link } from "react-router-dom";
import BoatsTable from "./boatsTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getBoats, deleteBoat } from "../services/boatService";
import SearchBox from "./searchBox";
import _ from "lodash";

class Boats extends Component {
  state = {
    boats: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
    selectedBoat: null,
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    const { data: boats } = await getBoats();
    this.setState({ boats: boats.model });
  }

  handleDelete = (boat) => {
    const boats = this.state.boats.filter((m) => m.boatId !== boat.boatId);
    this.setState({ boats });

    deleteBoat(boat.boatId);
  };

  handleLike = (boat) => {
    const boats = [...this.state.boats];
    const index = boats.indexOf(boat);
    boats[index] = { ...boats[index] };
    boats[index].liked = !boats[index].liked;
    this.setState({ boats });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedBoat: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      boats: allBoats,
    } = this.state;

    let filtered = allBoats;
    if (searchQuery)
      filtered = allBoats.filter((m) =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const boats = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: boats };
  };

  render() {
    const { length: count } = this.state.boats;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There are no boats in the database.</p>;

    const { totalCount, data: boats } = this.getPagedData();

    return (
      <div className="row">
        <div className="col">
          {
            <Link
              to="/boats/new"
              className="btn btn-primary"
              style={{ marginBottom: 20 }}
            >
              New Boat
            </Link>
          }
          <p>Showing {totalCount} boats in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <BoatsTable
            boats={boats}
            sortColumn={sortColumn}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Boats;
