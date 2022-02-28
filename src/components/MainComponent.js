import React, {Component} from 'react';
import {Stack, ThemeProvider, Typography} from "@mui/material";
import theme from '../theme'
import Box from "@mui/material/Box";
import {IconButton} from "@material-ui/core";
import {library} from '@fortawesome/fontawesome-svg-core'
import {faFileUpload} from '@fortawesome/free-solid-svg-icons'
import {ReactComponent as Logo} from "./Goodboi.svg";
import {PhotoCamera} from "@material-ui/icons";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import PropTypes from "prop-types";
import Dialog from "@mui/material/Dialog";
import styled from "@emotion/styled";
import PetsIcon from '@mui/icons-material/Pets';
import {DetectCustomLabelsCommand, RekognitionClient} from "@aws-sdk/client-rekognition"


library.add(faFileUpload)
require('dotenv').config()

const API_KEY1 = process.env.REACT_APP_API_ACCESS1
const API_KEY2 = process.env.REACT_APP_API_ACCESS2

const client = new RekognitionClient({
    region: 'eu-central-1',
    credentials: {accessKeyId: API_KEY1, secretAccessKey: API_KEY2}
})

const BootstrapDialog = styled(Dialog)(({theme}) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const BootstrapDialogTitle = (props) => {
    const {children, onClose, ...other} = props;

    return (
        <DialogTitle sx={{m: 0, p: 2}} {...other}>
            {children}
            {onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: 'right',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon/>
                </IconButton>
            ) : null}
        </DialogTitle>
    );
};

BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export class MainComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            photoTaken: false,
            selectedFile: null,
            open: true,
            image: null,
            emotion: null
        };
    }

    sortByProperty = (property) => {
        return function (a, b) {
            if (a[property] < b[property])
                return 1;
            else if (a[property] > b[property])
                return -1;
            return 0;
        }
    }

    arrayBufferToBinary = (buffer) => {
        var uint8 = new Uint8Array(buffer);
        return uint8.reduce((binary, uint8) => binary + uint8.toString(2), "");
    }

    handleClose = () => {
        this.setState({
            open: false
        })
        window.location.reload();
    }

    onFileChange = async event => {
        this.setState({
            image: URL.createObjectURL(event.target.files[0])
        })
        console.log(event.target.files[0])
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(event.target.files[0]);
        fileReader.onload = async () => {
            const binaryImage = fileReader.result;
            console.log(binaryImage)
            const cmd = new DetectCustomLabelsCommand({
                Image: {Bytes: new Uint8Array(binaryImage)},
                ProjectVersionArn: 'arn:aws:rekognition:eu-central-1:784937798157:project/Goodboi/version/Goodboi.2022-01-31T12.45.12/1643629510912'
            })
            const data = await client.send(cmd);
            this.setState({emotion: data.CustomLabels[0].Name})
            console.log(data);
        }
    };

    render() {
        return (
            <ThemeProvider theme={theme}>
                <Logo style={{
                    top: 0,
                    width: '100%',
                    height: '10%',
                    alignItems: 'center',
                    alignContent: 'center'
                }}/>
                <Box>
                    <div>
                        {this.state.image ?

                            <img align="center" id="target" src={this.state.image} width="100%"/>
                            :
                            <Box backgroundColor='white' width="100%" height='80%'>
                                <Stack direction="column" alignItems="center" spacing={2}>
                                    <PetsIcon style={theme.largeIcon} fontSize="large" color="secondary" top={50}/>
                                    <Typography style={{color: "primary"}} padding={3} align="center" variant="h5"
                                                color="primary">To let us predict your dogs emotion, take
                                        or upload a photo of your dog!</Typography>
                                    <Typography style={{color: "primary"}} padding={3} align="center" variant="h6"
                                                color="primary">Please
                                        make sure that the body posture of your dog is clearly visible.</Typography>
                                </Stack>
                            </Box>
                        }
                    </div>
                </Box>
                <Box backgroundColor='#D22423'>
                    <Stack direction="column" alignItems="center" spacing={2}>
                        <label htmlFor="icon-button-file">
                            <IconButton
                                color="primary"
                                aria-label="upload picture"
                                size="large" variant="contained" color="secondary" component="span"
                            >
                                <PhotoCamera fontSize="large" color="primary"/>
                            </IconButton>
                        </label>
                        <input type="file" style={{display: "none"}}
                               id="contained-button-file" onChange={this.onFileChange}/>
                        <label htmlFor="contained-button-file">
                            <IconButton
                                color="primary"
                                aria-label="upload picture"
                                size="large" variant="contained" color="secondary" component="span"
                            >
                                <UploadFileIcon fontSize="large" color="primary"/>
                            </IconButton>
                        </label>
                        <input
                            style={{display: 'none'}}
                            type='file'
                            id="icon-button-file"
                            accept="image/*"
                            capture="environment"
                            onChange={this.onFileChange} textAlign='center' size="large" color="secondary"
                            aria-label="upload picture"
                            component="span"
                        />
                    </Stack>
                </Box>
                {this.state.emotion &&
                <div>
                    <BootstrapDialog
                        onClose={this.handleClose}
                        open={this.state.open}
                    >
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={this.handleClose}>
                            <Typography style={{color: "primary"}} align="left" variant="h8" color="primary"> Predicted
                                emotion </Typography>
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                            <Typography style={{color: "primary"}} padding={3} align="center" variant="h6"
                                        color="primary">
                                The predicted emotion of your dog is <Typography style={{color: "primary"}} padding={3}
                                                                                 align="center" variant="h6"
                                                                                 color="secondary">{this.state.emotion}</Typography>
                            </Typography>
                        </DialogContent>
                    </BootstrapDialog>
                </div>}
            </ThemeProvider>
        )

    }
}

