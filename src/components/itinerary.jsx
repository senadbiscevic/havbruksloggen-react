import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/index";

class Itinerary extends Component {

  componentDidMount() {
    this.props.onFetchBoats();
  }

  render() {
    return (
      <div>
        <h2>Itinerary</h2>
        {this.props.boats.map((boat) => {
          return (
            <ul className="list-unstyled">
              <li key={boat.boatId}>
                <span>{boat.name} </span>
              </li>
              {boat.boatCrewCollection.map((crew) => {
                return (
                  <ul>
                    <li key={crew.crewId}>
                      <span>{crew.sailor.name} </span>;
                    </li>
                  </ul>
                );
              })}
            </ul>
          );
        })}
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
    onFetchBoats: () => dispatch(actions.fetchBoats())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Itinerary);
