import React, { Component } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import Table from "./common/table";

class SailorsTable extends Component {
  columns = [
    {
      path: "picture",
      label: "Picture",
      content: (sailor) => <img src={sailor.picture} width="80" height="80" alt=""></img>,
    },
    {
      path: "name",
      label: "Name",
      content: (sailor) => <Link to={`/sailors/${sailor.sailorId}`}>{sailor.name}</Link>,
    },
    {
      path: "age",
      label: "Age",
      content: (sailor) => <span>{sailor.age}</span>,
    },
    {
      path: "email",
      label: "Email",
      content: (sailor) => <span>{sailor.email}</span>,
    },
    {
      path: "certifiedUntil",
      label: "Cert. until",
      content: (sailor) => <span>
        {moment(sailor.certifiedUntil).format("DD.MM.YYYY")}
        
        </span>,
    }
  ];

  deleteColumn = {
    key: "delete",
    content: (sailor) => (
      <button
        onClick={() => this.props.onDelete(sailor)}
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
    const { sailors, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={sailors}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default SailorsTable;
