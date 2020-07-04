import React, { Component } from "react";
import { Link } from "react-router-dom";
import Table from "./common/table";

class BoatsTable extends Component {
  columns = [
    {
      path: "picture",
      label: "Picture",
      content: (boat) => <img src={boat.picture} width="80" height="80" alt=""></img>,
    },
    {
      path: "name",
      label: "Name",
      content: (boat) => <Link to={`/boats/${boat.boatId}`}>{boat.name}</Link>,
    },
    {
      path: "producer",
      label: "Producer",
      content: (boat) => <span>{boat.producer}</span>,
    },
    {
      path: "buildNumber",
      label: "BuildNumber",
      content: (boat) => <span>{boat.buildNumber}</span>,
    },
    {
      path: "loa",
      label: "LOA",
      content: (boat) => <span>{boat.loa}</span>,
    },
    {
      path: "b",
      label: "B",
      content: (boat) => <span>{boat.b}</span>,
    }
  ];

  deleteColumn = {
    key: "delete",
    content: (boat) => (
      <button
        onClick={() => this.props.onDelete(boat)}
        className="btn btn-danger btn-sm"
      >
        Delete
      </button>
    ),
  };

  constructor() {
    super();
    // const user = auth.getCurrentUser();
    // if (user && user.isAdmin) this.columns.push(this.deleteColumn);
    this.columns.push(this.deleteColumn);
  }

  render() {
    const { boats, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={boats}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default BoatsTable;
