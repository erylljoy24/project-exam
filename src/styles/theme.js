import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import purple from '@material-ui/core/colors/purple';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#7089ff',
            main: '#175cff',
            dark: '#0034cb',
            customLight: '#ecf0ff',
            contrastText: '#ffffff',
        },
        secondary: {
            light: '#565b91',
            main: '#283263',
            dark: '#000b38',
            contrastText: '#ffffff',
        },
        employer: {
            light: '#ffff58',
            main: '#fff204',
            dark: '#c7c000',
            contrastText: '#000000'
        },
        jobseeker: {
            light: '#fffe67',
            main: '#fecb31',
            dark: '#c79b00',
            contrastText: '#ffffff'
        },
        success: {
            light: '#81c784',
            main: '#4caf50',
            dark: '#388e3c'
        },
        text: {
            dark: '#000000',
            light: '#ffffff'
        },
    },
    stats: {
        danger: 'red'
    },
    card: {
        dirty: '#e1e4f5'
    }
});

export default theme;