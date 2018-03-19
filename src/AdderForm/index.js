import React, { Component } from "react";
import AdderForm from "./AdderForm";
import NewDataList from "./List";
import ListHeader from "./ListHeader";

class FilterConfigAdder extends Component {
  state = {
    data: [{ lang: "hi", topicId: 12, NPCat: 34 }]
  };

  handleAdd = addThis => {
    let newData = [...this.state.data];
    newData.unshift(addThis);
    console.log(newData);
    this.setState({ data: [...newData] });
  };

  handleDelete = deleteThis => {
    if (deleteThis) {
      let oldData = [...this.state.data];
      let newData = oldData.filter(
        stuff =>
          !(
            deleteThis.lang === stuff.lang &&
            deleteThis.topicId === stuff.topicId &&
            deleteThis.NPCat === stuff.NPCat
          )
      );
      this.setState({ data: [...newData] });
    }
  };

  render() {
    return (
      <div>
        <AdderForm onAdd={this.handleAdd} />
        <ListHeader />
        <div
          style={{
            maxHeight: 60
          }}
        >
          <NewDataList data={this.state.data} onDel={this.handleDelete} />
        </div>
        {/* <pre>{JSON.stringify(this.state.data, 2, 2)}</pre> */}
      </div>
    );
  }
}

export default FilterConfigAdder;
