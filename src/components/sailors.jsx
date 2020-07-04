import React, { Component } from "react";
import { Link } from "react-router-dom";
import SailorsTable from "./sailorsTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import { getSailors, deleteSailor } from "../services/sailorService";
import SearchBox from "./searchBox";
import _ from "lodash";

class Sailors extends Component {
  state = {
    sailors: [],
    currentPage: 1,
    pageSize: 10,
    searchQuery: "",
    selectedSailor: null,
    sortColumn: { path: "title", order: "asc" }
  };

  async componentDidMount() {
    const { data: sailors } = await getSailors();
    this.setState({ sailors: sailors.model });
  }

  handleDelete = sailor => {
    const sailors = this.state.sailors.filter(m => m.sailorId !== sailor.sailorId);
    this.setState({ sailors });

    deleteSailor(sailor.sailorId);
  };

  handleLike = sailor => {
    const sailors = [...this.state.sailors];
    const index = sailors.indexOf(sailor);
    sailors[index] = { ...sailors[index] };
    sailors[index].liked = !sailors[index].liked;
    this.setState({ sailors });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleSailorSelect = sailor => {
    this.setState({ selectedSailor: sailor, currentPage: 1 });
  };

  handleSearch = query => {
    this.setState({ searchQuery: query, selectedSailor: null, currentPage: 1 });
  };

  handleSort = sortColumn => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      pageSize,
      currentPage,
      sortColumn,
      searchQuery,
      sailors: allSailors
    } = this.state;

    let filtered = allSailors;
    if (searchQuery)
      filtered = allSailors.filter(m =>
        m.name.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const sailors = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: sailors };
  };

  render() {
    const { length: count } = this.state.sailors;
    const { pageSize, currentPage, sortColumn, searchQuery } = this.state;

    if (count === 0) return <p>There are no sailors in the database.</p>;

    const { totalCount, data: sailors } = this.getPagedData();

    return (
      <div className="row">
        <div className="col">
        {
          <Link
            to="/sailors/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Sailor
          </Link>}
          <p>Showing {totalCount} sailors in the database.</p>
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
          <SailorsTable
            sailors={sailors}
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

export default Sailors;
