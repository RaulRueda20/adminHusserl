import React from 'react';
import ErrorIcon from '@material-ui/icons/Error';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import {amber, green} from '@material-ui/core/colors';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';

const iconoVariante={
    success: CheckCircleIcon,
    error: ErrorIcon,
    warning: WarningIcon
}

const useStyle1=makeStyles(theme=>({
    success:{
        backgroundColor: green[600],
    },
    error:{
        backgroundColor: theme.palette.error.dark,
    },
    warning:{
        backgroundColor: amber[700]
    },
    icon:{
        fontSize:20,
    },
    iconVariant:{
        opacity: 0.9,
        marginRight: theme.spacing(1)
    },
    message:{
        display:"flex",
        alingItems: "center"
    }
}))

function EnvoltorioDeSnack(props){
    const classes = useStyle1();
    const {className, message, onClose, variant, ...other}=props;
    const Icon = iconoVariante[variant]

    return(
        <SnackbarContent
        className={clsx(classes[variant], className)}
        aria-describedby="client-snackbar"
        message={
            <span id="client-snackbar" className={classes.message}>
                <Icon className={clsx(classes.icon, classes.iconVariant)} />
                {message}
            </span>
        }
        {...other}
        />
    )
}

const useStyle2 = makeStyles(theme=>({
    margin: {
        margin: theme.spacing(1)
    }
}))

export default function Snackbars(props){
    const classes=useStyle2();

    return(
        <div>
            <Snackbar
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left"
            }}
            open={props.snackbar.open}
            onClose={props.handleClose}
            >
                <EnvoltorioDeSnack
                variant={props.snackbar.variant}
                message={props.snackbar.message}
                />
            </Snackbar>
        </div>
    )
}
