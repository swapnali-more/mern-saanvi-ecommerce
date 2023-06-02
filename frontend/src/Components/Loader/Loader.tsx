import React from 'react'
import { Box, CircularProgress } from '@mui/material';
import useStyles from "./LoaderStyles"

const Loader = () => {
    const classes = useStyles();
    return (
        <Box className={classes.loader}>
            <CircularProgress />
        </Box>
    )
}

export default Loader