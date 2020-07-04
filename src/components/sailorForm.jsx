import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getSailor, saveSailor } from "../services/sailorService";

class SailorForm extends Form {
  state = {
    data: {
      name: "",
      birthDate: "",
      email: "",
      certifiedUntil: ""
    },
    errors: {},
  };

  schema = {
    sailorId: Joi.string(),
    name: Joi.string().required().label("Name"),
    birthDate: Joi.date().required().label("Producer"),
    email: Joi.string().required().label("Build Number"),
    certifiedUntil: Joi.date().required().label("LOA")
  };

  async populateSailor() {
    try {
      const sailorId = this.props.match.params.id;
      if (sailorId === "new") return;

      const { data: sailor } = await getSailor(sailorId);
      this.setState({ data: this.mapToViewModel(sailor.model) });
      console.log(this.state)
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        this.props.history.replace("/not-found");
    }
  }

  async componentDidMount() {
    await this.populateSailor();
  }

  mapToViewModel(sailor) {
    return {
      sailorId: sailor.sailorId,
      name: sailor.name,
      birthDate: sailor.birthDate,
      email: sailor.email,
      certifiedUntil: sailor.certifiedUntil
    };
  }

  doSubmit = async () => {
    await saveSailor(this.state.data);

    this.props.history.push("/sailors");
  };

  render() {
    return (
      <div>
        <h1>Sailor Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("name", "Name")}
          {this.renderDateInput("birthDate", "Birth date", "date")}
          {this.renderInput("email", "Email")}
          {this.renderDateInput("certifiedUntil", "CertifiedUntil", "date")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default SailorForm;
