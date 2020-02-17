import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Typography from '@material-ui/core/Typography';
import {adminService} from '../../js/webServices';
import {  makeStyles, useTheme } from '@material-ui/styles';

const useStyles1 = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing(2.5),
    textAlign: 'center'
  },
}));

const getFecha = (d) => {
  var f = new Date(d)
  var day = f.getDate() < 10 ? "0" + f.getDate() : f.getDate()
  var month = f.getMonth() + 1 < 10 ? "0" + (f.getMonth() + 1): f.getMonth() + 1
  var year = f.getFullYear()
  return day + "/" + month + "/" + year
}

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

function createData(id_usuario, nombre_usuario, apellido_usuario, pais_usuario, mail_usuario, institucion_usuario, lastaccess_usuario, registro_usuario) {
  return { id_usuario, nombre_usuario, apellido_usuario, pais_usuario, mail_usuario, institucion_usuario, lastaccess_usuario, registro_usuario };
}

const useStyles2 = makeStyles(theme => ({
  root: {
    // width: '100%',
    margin: theme.spacing(3),
    textAlign : "center",
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
  const [rows, setRows] = React.useState([])
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

  React.useEffect(() => {
    adminService('/login/all', 'GET', {}, (response) => {
      console.log("usuarios", response)
      var r = []
      for(var i in response.data.response){
        var usuario = response.data.response[i]
        r.push(createData(usuario.id, usuario.nombre, usuario.apellidos, usuario.pais, usuario.email, usuario.institucion, getFecha(usuario.registro), getFecha(usuario.lastaccess)))
      }
      setRows(r)
    })
  }, [true])

  return (
    <div className={classes.root}>
      <Typography variant="h3">LISTA DE USUARIOS</Typography><br/>
      <Divider/>
      <div className={classes.tableWrapper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              {/* <TableCell
                key={row.id}
                align={row.numeric ? 'right' : 'left'}
                padding={row.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === row.id ? order : false}
              >
                <TableSortLabel
                  active={orderBy === row.id}
                  direction={order}
                  onClick={createSortHandler(row.id)}
                >
                  {row.label}
                </TableSortLabel>
              </TableCell> */}
              <TableCell align="right">ID</TableCell>
              <TableCell align="right">Nombre</TableCell>
              <TableCell align="right">Apellidos</TableCell>
              <TableCell align="right">País</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Institución</TableCell>
              <TableCell align="right">Último Acceso</TableCell>
              <TableCell align="right">Registro</TableCell>
            </TableRow>
          </TableHead>
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
                <TableCell align="right">{row.registro_usuario}</TableCell>
                <TableCell align="right">{row.lastaccess_usuario}</TableCell>
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
    </div>
  );
}

export default Usuarios;