import { makeStyles } from '@mui/styles';
import theme from '../../Utils/theme';

export default makeStyles(() => ({
    logo: {
     maxWidth: 150
    },
    menuLink: {
        fontSize: 16,
        color: `${theme.palette.secondary.main}`,
        textDecoration: 'none',
        fontWeight: 500,
        margin: `0 10px`
    },
}))