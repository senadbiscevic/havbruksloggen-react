import React, { Component } from "react";
import { getBoats } from "../services/boatService";

class Itinerary extends Component {
  state = {
    boats: [],
  };

  async componentDidMount() {
    const { data: boats } = await getBoats();
    this.setState({ boats: boats.model });
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <h2>Itinerary</h2>
        {this.state.boats.map((boat) => {
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

export default Itinerary;
