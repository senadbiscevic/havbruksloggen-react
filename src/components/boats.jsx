import React, { Component } from "react";
import { Link } from "react-router-dom";
import BoatsTable from "./boatsTable";
import Pagination from "./common/pagination";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import { paginate } from "../utils/paginate";
import SearchBox from "./searchBox";
import _ from "lodash";

class Boats extends Component {
  state = {
    currentPage: 1,
    pageSize: 8,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  async componentDidMount() {
    this.props.onFetchBoats();
  }

  handleDelete = (boat) => {
    this.props.onRemoveBoat(boat.boatId);
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
    const { boats: allBoats } = this.props;

    const { currentPage, pageSize, searchQuery, sortColumn } = this.state;

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
    const { length: count } = this.props.boats;
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

const mapStateToProps = (state) => {
  return {
    boats: state.boatReducer.boats,
    currentPage: state.boatReducer.currentPage,
    pageSize: state.boatReducer.pageSize,
    searchQuery: state.boatReducer.searchQuery,
    selectedBoat: state.boatReducer.selectedBoat,
    sortColumn: state.boatReducer.sortColumn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchBoats: () => dispatch(actions.fetchBoats()),
    onRemoveBoat: (boatId) => dispatch(actions.removeBoat(boatId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Boats);
