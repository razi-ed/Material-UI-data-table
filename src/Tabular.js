import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { withStyles } from "material-ui/styles";
import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  TableSortLabel
} from "material-ui/Table";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import Paper from "material-ui/Paper";
import Checkbox from "material-ui/Checkbox";
import IconButton from "material-ui/IconButton";
import Button from "material-ui/Button";
import Tooltip from "material-ui/Tooltip";
import DeleteIcon from "material-ui-icons/Delete";
import AddIcon from "material-ui-icons/Add";
import { lighten } from "material-ui/styles/colorManipulator";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle,
  withMobileDialog
} from "material-ui/Dialog";

import NewDataAdderForm from "./AdderForm";

let counter = 0;
function createData(lang, topicId, NPCat) {
  counter += 1;
  return { id: counter, lang, topicId, NPCat };
}

const columnData = [
  { id: "lang", numeric: false, disablePadding: true, label: "Language" },
  { id: "topicId", numeric: true, disablePadding: false, label: "Topic ID" },
  { id: "NPCat", numeric: true, disablePadding: false, label: "NPCat" }
];

class EnhancedTableHead extends React.Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const {
      onSelectAllClick,
      order,
      orderBy,
      numSelected,
      rowCount
    } = this.props;

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          </TableCell>
          {columnData.map(column => {
            return (
              <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? "none" : "default"}
                sortDirection={orderBy === column.id ? order : false}
              >
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? "bottom-end" : "bottom-start"}
                  enterDelay={300}
                >
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={order}
                    onClick={this.createSortHandler(column.id)}
                  >
                    {column.label}
                  </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: "1 1 100%"
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: "0 0 auto"
  }
});

let EnhancedTableToolbar = props => {
  const { numSelected, classes, onDel, onAdd } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title">Filter Config</Typography>
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton
              aria-label="Delete"
              onClick={() => {
                onDel();
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Add list">
            <IconButton
              aria-label="Add list"
              onClick={() => {
                onAdd();
              }}
            >
              <AddIcon />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 800
  },
  tableWrapper: {
    overflowX: "auto"
  }
});

class ResponsiveDialog extends React.Component {
  state = {};
  render() {
    const { fullScreen, open, onClose } = this.props;

    return (
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={onClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{"Add \u2728"}</DialogTitle>
          <DialogContent>
            <NewDataAdderForm />
          </DialogContent>
          <DialogActions>
            <Button onClick={onClose} color="secondary">
              DISCARD
            </Button>
            <Button onClick={onClose} color="alternative">
              SAVE FOR LATER
            </Button>
            <Button onClick={onClose} color="primary">
              ADD NOW
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

ResponsiveDialog.propTypes = {
  fullScreen: PropTypes.bool.isRequired
};

withMobileDialog()(ResponsiveDialog);

class EnhancedTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      order: "asc",
      orderBy: "NPCat",
      selected: [],
      data: [
        createData("EN", 305, 12),
        createData("HI", 452, 51),
        createData("EN", 211, 43),
        createData("HI", 234, 67),
        createData("EN", 565, 89),
        createData("HI", 476, 32)
      ].sort((a, b) => (a.NPCat < b.NPCat ? -1 : 1)),
      page: 0,
      rowsPerPage: 10,
      showAddForm: false
    };
  }

  handleRequestSort = (event, property) => {
    const orderBy = property;
    let order = "desc";

    if (this.state.orderBy === property && this.state.order === "desc") {
      order = "asc";
    }

    const data =
      order === "desc"
        ? this.state.data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
        : this.state.data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));

    this.setState({ data, order, orderBy });
  };

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.state.data.map(n => n.id) });
      return;
    }
    this.setState({ selected: [] });
  };

  handleClick = (event, id) => {
    const { selected } = this.state;
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    this.setState({ selected: newSelected });
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  handleDelSelected = () => {
    let oldData = [...this.state.data];
    let selectedStuffs = [...this.state.selected];
    let newData = oldData.filter(
      stuffs =>
        !selectedStuffs.some(selectedStuff => selectedStuff === stuffs.id)
    );
    this.setState({ data: [...newData], selected: [] });
  };

  openAddForm = () => {
    this.setState({ showAddForm: true });
  };

  closeAddForm = () => {
    this.setState({ showAddForm: false });
  };

  isSelected = id => this.state.selected.indexOf(id) !== -1;

  render() {
    const { classes } = this.props;
    const { data, order, orderBy, selected, rowsPerPage, page } = this.state;
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return (
      <div>
        <Paper className={classes.root}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            onDel={this.handleDelSelected}
            onAdd={this.openAddForm}
          />
          <div className={classes.tableWrapper}>
            <Table className={classes.table}>
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                onSelectAllClick={this.handleSelectAllClick}
                onRequestSort={this.handleRequestSort}
                rowCount={data.length}
              />
              <TableBody>
                {data
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map(n => {
                    const isSelected = this.isSelected(n.id);
                    return (
                      <TableRow
                        hover
                        onClick={event => this.handleClick(event, n.id)}
                        role="checkbox"
                        aria-checked={isSelected}
                        tabIndex={-1}
                        key={n.id}
                        selected={isSelected}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox checked={isSelected} />
                        </TableCell>
                        <TableCell padding="none">{n.lang}</TableCell>
                        <TableCell numeric>{n.topicId}</TableCell>
                        <TableCell numeric>{n.NPCat}</TableCell>
                      </TableRow>
                    );
                  })}
                {emptyRows > 0 && (
                  <TableRow style={{ height: 49 * emptyRows }}>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TablePagination
                    colSpan={6}
                    count={data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    backIconButtonProps={{
                      "aria-label": "Previous Page"
                    }}
                    nextIconButtonProps={{
                      "aria-label": "Next Page"
                    }}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                  />
                </TableRow>
              </TableFooter>
            </Table>
          </div>
        </Paper>
        <pre>{JSON.stringify(this.state.selected, 3, 3)}</pre>
        <ResponsiveDialog
          fullScreen={true}
          open={this.state.showAddForm}
          onClose={this.closeAddForm}
        />
      </div>
    );
  }
}

EnhancedTable.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EnhancedTable);
