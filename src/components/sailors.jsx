import React, { Component } from "react";
import { Link } from "react-router-dom";
import SailorsTable from "./sailorsTable";
import Pagination from "./common/pagination";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";
import { paginate } from "../utils/paginate";
import SearchBox from "./searchBox";
import _ from "lodash";

class Sailors extends Component {
  state = {
    currentPage: 1,
    pageSize: 8,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" }
  }

  async componentDidMount() {
    this.props.onFetchSailors();
  }

  handleDelete = sailor => {
    this.props.onRemoveSailor(sailor.sailorId);
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
      sailors: allSailors
    } = this.props;

    const { currentPage, pageSize, searchQuery, sortColumn } = this.state;

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
    const { length: count } = this.props.sailors;
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

const mapStateToProps = (state) => {
  return {
    sailors: state.sailorReducer.sailors,
    currentPage: state.sailorReducer.currentPage,
    pageSize: state.sailorReducer.pageSize,
    searchQuery: state.sailorReducer.searchQuery,
    selectedSailor: state.sailorReducer.selectedSailor,
    sortColumn: state.sailorReducer.sortColumn
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchSailors: () => dispatch(actions.fetchSailors()),
    onRemoveSailor: (sailorId) => dispatch(actions.removeSailor(sailorId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sailors);
