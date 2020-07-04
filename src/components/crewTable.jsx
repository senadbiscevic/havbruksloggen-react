import React, { Component } from "react";
// import { Link } from "react-router-dom";
import Table from "./common/table";

class CrewTable extends Component {
  columns = [
    // {
    //   path: "crewId",
    //   label: "Name",
    //   content: (crew) => <Link to={`/crews/${crew.crewId}`}>{crew.name}</Link>,
    // },
    {
      path: "role",
      label: "ID",
      content: (crew) => <span>{crew.role}</span>,
    },
    // {
    //   path: "email",
    //   label: "Email",
    //   content: (crew) => <span>{crew.email}</span>,
    // },
    // {
    //   path: "certifiedUntil",
    //   label: "Cert. until",
    //   content: (crew) => <span>
    //     {moment(crew.certifiedUntil).format("DD.MM.YYYY")}
        
    //     </span>,
    // }
  ];

  deleteColumn = {
    key: "delete",
    content: (crew) => (
      <button
        onClick={() => this.props.onDelete(crew)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    this.columns.push(this.deleteColumn);
  }

  render() {
    const { crew, onSort, sortColumn } = this.props;

    console.log(crew)
    return (
        <Table
        columns={this.columns}
        data={crew}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default CrewTable;
