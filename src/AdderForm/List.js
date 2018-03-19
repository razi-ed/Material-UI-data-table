import React from "react";
import { Card, Typography, IconButton } from "material-ui";
import DeleteIcon from "material-ui-icons/Delete";

const NewDataList = props => {
  let { data, onDel } = props;
  return data.map(e => {
    return (
      <Card raised>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            marginTop: 10
          }}
        >
          <Typography variant="headline">{e.lang}</Typography>
          <Typography variant="headline">{e.topicId}</Typography>
          <Typography variant="headline">{e.NPCat}</Typography>
          <IconButton
            color="secondary"
            aria-label="Delete"
            onClick={x => {
              x.preventDefault();
              onDel(e);
              console.log(e);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </Card>
    );
  });
};

export default NewDataList;
