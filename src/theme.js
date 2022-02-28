import {createMuiTheme} from '@material-ui/core/styles'

const theme = createMuiTheme({
    largeIcon: {
        width: 150,
        height: 150,
    },
    breakpoints: {
        values: {
            xxs: 0, // small phone
            xs: 300, // phone
            sm: 600, // tablets
            md: 900, // small laptop
            lg: 1200, // desktop
            xl: 1536 // large screens
        }
    },
    palette: {
        background: {
            default: "#3D4454"
        },
        type: 'light',
        primary: {
            main: '#3D4454',
        },
        secondary: {
            main: '#D22423',
        },
        success: {
            main: '#5CF64A',
        },
        error: {
            main: '#89023E',
        },
        warning: {
            main: '#89023E',
        },
        info: {
            main: '#3772FF',
        },
    },
    props: {
        MuiTooltip: {
            arrow: true,
        },
        MuiList: {
            dense: true,
        },
        MuiMenuItem: {
            dense: true,
        },
        MuiTable: {
            size: 'small',
        },
        MuiButton: {
            size: 'middle',
        },
        MuiButtonGroup: {
            size: 'small',
        },
        MuiCheckbox: {
            size: 'small',
        },
        MuiFab: {
            size: 'small',
        },
        MuiFormControl: {
            margin: 'dense',
            size: 'small',
        },
        MuiFormHelperText: {
            margin: 'dense',
        },
        MuiIconButton: {
            size: 'small',
        },
        MuiInputBase: {
            margin: 'dense',
        },
        MuiInputLabel: {
            margin: 'dense',
        },
        MuiRadio: {
            size: 'small',
        },
        MuiSwitch: {
            size: 'small',
        },
        MuiTextField: {
            margin: 'dense',
            size: 'small',
        },
    },
    overrides: {
        MuiSwitch: {
            root: {
                width: 42,
                height: 26,
                padding: 0,
                margin: 8,
            },
            switchBase: {
                padding: 1,
                '&$checked, &$colorPrimary$checked, &$colorSecondary$checked': {
                    transform: 'translateX(16px)',
                    color: '#fff',
                    '& + $track': {
                        opacity: 1,
                        border: 'none',
                    },
                },
            },
            thumb: {
                width: 24,
                height: 24,
            },
            logoLoginScreen: {
                top: 0,
                width: 381,
                height: 438,
                left: 0,
            },
            track: {
                borderRadius: 13,
                border: '1px solid #bdbdbd',
                backgroundColor: '#fafafa',
                opacity: 1,
                transition: 'background-color 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
            },
        },
    },
})
export default theme
