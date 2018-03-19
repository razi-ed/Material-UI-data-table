import React from "react";
import { Card, Typography } from "material-ui";

const ListHeader = () => {
  return (
    <Card>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          paddingRight: 25
        }}
      >
        <Typography variant="subheading">Language</Typography>
        <Typography variant="subheading">Topic ID</Typography>
        <Typography variant="subheading">NPCat</Typography>
        <Typography variant="subheading">Action</Typography>
      </div>
    </Card>
  );
};

export default ListHeader;
