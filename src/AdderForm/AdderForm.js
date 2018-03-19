import React from "react";
import { TextField, Button } from "material-ui";
import AddIcon from "material-ui-icons/Add";

const FilterConfigAdderForm = props => {
  let { onAdd } = props;
  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        let targValues = [...e.target];
        let lang = targValues[0].value;
        targValues[0].value = "";
        let topicId = targValues[1].value;
        targValues[1].value = "";
        let NPCat = targValues[2].value;
        targValues[2].value = "";

        let data = {
          lang,
          topicId,
          NPCat
        };
        onAdd(data);
        console.log(data);
      }}
      autoComplete="off"
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around"
      }}
    >
      <TextField
        id="Language"
        label="Language"
        margin="normal"
        autoFocus={true}
      />
      <TextField id="topicId" label="Topic ID" margin="normal" />
      <TextField id="NPCat" label="NPCat" margin="normal" />
      <Button
        variant="raised"
        color="primary"
        style={{
          marginTop: 20,
          marginBottom: 10
        }}
        type="submit"
      >
        ADD <AddIcon />
      </Button>
    </form>
  );
};

export default FilterConfigAdderForm;
