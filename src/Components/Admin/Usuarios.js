import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Grid from '@material-ui/core/Grid';
import {  makeStyles, useTheme } from '@material-ui/styles';

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  function handleFirstPageButtonClick(event) {
    onChangePage(event, 0);
  }

  function handleBackButtonClick(event) {
    onChangePage(event, page - 1);
  }

  function handleNextButtonClick(event) {
    onChangePage(event, page + 1);
  }

  function handleLastPageButtonClick(event) {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  }

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

function createData(id_usuario, nombre_usuario, apellido_usuario, pais_usuario, mail_usuario, institucion_usuario, pass_usuario, lastaccess_usuario, registro_usuario) {
  return { id_usuario, nombre_usuario, apellido_usuario, pais_usuario, mail_usuario, institucion_usuario, pass_usuario, lastaccess_usuario, registro_usuario };
}

const rows = [
  createData(1, 'Nonis', 'Pineda', 'México', 'Nora@gmail', 'Colegio Canadiense', 12-13-12, 12-4-32),
  createData(2, 'Nonis', 'Pineda', 'México', 'Nora@gmail', 'Colegio Canadiense', 12-13-12, 12-4-32),
  createData(3, 'Nonis', 'Pineda', 'México', 'Nora@gmail', 'Colegio Canadiense', 12-13-12, 12-4-32),
  createData(4, 'Nonis', 'Pineda', 'México', 'Nora@gmail', 'Colegio Canadiense', 12-13-12, 12-4-32),
  createData(5, 'Nonis', 'Pineda', 'México', 'Nora@gmail', 'Colegio Canadiense', 12-13-12, 12-4-32),
  createData(6, 'Nonis', 'Pineda', 'México', 'Nora@gmail', 'Colegio Canadiense', 12-13-12, 12-4-32),
  createData(7, 'Nonis', 'Pineda', 'México', 'Nora@gmail', 'Colegio Canadiense', 12-13-12, 12-4-32),
  createData(8, 'Nonis', 'Pineda', 'México', 'Nora@gmail', 'Colegio Canadiense', 12-13-12, 12-4-32),
  createData(9, 'Nonis', 'Pineda', 'México', 'Nora@gmail', 'Colegio Canadiense', 12-13-12, 12-4-32),
  createData(10, 'Nonis', 'Pineda', 'México', 'Nora@gmail', 'Colegio Canadiense', 12-13-12, 12-4-32),
  createData(11, 'Nonis', 'Pineda', 'México', 'Nora@gmail', 'Colegio Canadiense', 12-13-12, 12-4-32),
  createData(12, 'Nonis', 'Pineda', 'México', 'Nora@gmail', 'Colegio Canadiense', 12-13-12, 12-4-32),
  createData(13, 'Nonis', 'Pineda', 'México', 'Nora@gmail', 'Colegio Canadiense', 12-13-12, 12-4-32),
].sort((a, b) => (a.calories < b.calories ? -1 : 1));

const useStyles2 = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  table: {
    minWidth: 500,
  },
  tableWrapper: {
    overflowX: 'auto',
  },
}));

function Usuarios() {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [usuarios, setUsuarios] = React.usetState([])

  React.useEffect(()=>{
    var service = '/listausuarios'
  })

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => (
              <TableRow key={row.id_usuario}>
                <TableCell component="th" scope="row">
                  {row.id_usuario}
                </TableCell>
                <TableCell align="right">{row.nombre_usuario}</TableCell>
                <TableCell align="right">{row.apellido_usuario}</TableCell>
                <TableCell align="right">{row.pais_usuario}</TableCell>
                <TableCell align="right">{row.mail_usuario}</TableCell>
                <TableCell align="right">{row.institucion_usuario}</TableCell>
                <TableCell align="right">{row.pass_usuario}</TableCell>
                <TableCell align="right">{row.lastaccess_usuario}</TableCell>
                <TableCell align="right">{row.registro_usuario}</TableCell>
              </TableRow>
            ))}

            {emptyRows > 0 && (
              <TableRow style={{ height: 48 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                colSpan={3}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </Paper>
  );
}

export default Usuarios;