import React from "react";
import { Typeahead } from "react-bootstrap-typeahead";
import Joi from "joi-browser";
import Form from "./common/form";
import { getBoat, saveBoat } from "../services/boatService";
import { getSailors } from "../services/sailorService";

import "react-bootstrap-typeahead/css/Typeahead.css";

class BoatForm extends Form {
  state = {
    data: {
      name: "",
      producer: "",
      buildNumber: "",
      loa: 0,
      b: 0,
      boatCrewCollection: [],
    },
    sailors: [],
    selected: [],
    role: 0,
    errors: {},
  };

  schema = {
    boatId: Joi.string(),
    name: Joi.string().required().label("Name"),
    producer: Joi.string().required().label("Producer"),
    buildNumber: Joi.string().required().label("Build Number"),
    loa: Joi.number().precision(2).required().label("LOA"),
    b: Joi.number().precision(1).required().label("B"),
    boatCrewCollection: Joi.any(),
  };

  async populateBoat() {
    try {
      const boatId = this.props.match.params.id;
      if (boatId === "new") return;

      const { data: boat } = await getBoat(boatId);
      this.setState({ data: this.mapToViewModel(boat.model) });
      console.log(this.state);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateBoat();

    const { data: sailors } = await getSailors();
    this.setState({ sailors: sailors.model });
  }

  mapToViewModel(boat) {
    return {
      boatId: boat.boatId,
      name: boat.name,
      producer: boat.producer,
      buildNumber: boat.buildNumber,
      loa: boat.loa,
      b: boat.b,
      boatCrewCollection: boat.boatCrewCollection,
    };
  }

  doSubmit = async () => {
    await saveBoat(this.state.data);

    this.props.history.push("/boats");
  };

  onDeleteCrew = (crew) => {
    const data = { ...this.state.data };

    data.boatCrewCollection = this.state.data.boatCrewCollection.filter(
      (m) => m.crewId !== crew.crewId
    );

    this.setState({ data: data });
  };

  ondAddCrew = () => {
    var member = {
      crewId: this.state.data.boatCrewCollection.length,
      boat: null,
      role: this.state.role,
      sailor: this.state.selected[0],
    };

    const state = { ...this.state };

    state.data.boatCrewCollection.push(member);
    this.setState({ data: state.data, selected: [] });

    this.state.role = null;
  };

  render() {
    return (
      <div>
        <h1>Boat Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderInput("producer", "Producer")}
          {this.renderInput("buildNumber", "Build Number")}
          {this.renderNumberInput("loa", "LOA", ".01", "number")}
          {this.renderNumberInput("b", "B", ".1", "number")}
          <h2>Crew members</h2>
          <div className="input-group">
            <Typeahead
              {...this.state}
              id="basic-example"
              labelKey="name"
              onChange={(selected) => {
                this.setState({ selected });
              }}
              options={this.state.sailors}
              selected={this.state.selected}
              placeholder="Choose a sailor..."
            />
            <select
              className="custom-select"
              onChange={(role) => {
                this.setState({ role: role.target.value });
              }}
            >
              <option value="0">Captain</option>
              <option value="1">Deck Cadet</option>
              <option value="2">Chier Engineer</option>
              <option value="3">Motorman</option>
            </select>
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => this.ondAddCrew()}
              >
                Add
              </button>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Sailor</th>
                <th scope="col">Role</th>
              </tr>
            </thead>
            <tbody>
              {this.state.data.boatCrewCollection.map((crew) => {
                return (
                  <tr key={crew.crewId}>
                    <td>{crew.sailor.name}</td>
                    <td>{crew.role}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        onClick={() => this.onDeleteCrew(crew)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default BoatForm;
