import React, { Component, Fragment } from 'react';
import Dropzone from 'react-dropzone'
class DropzoneUpload extends Component {
    constructor(props) {
        super(props);
        this.onImageDrop = this.onImageDrop.bind(this);
        this.state = {
            imageFiles: [],
            imgSrc: [],
            isChange: false,
            isSuccess: false,
            isLoad: false
        }
    }

    onImageDrop(selectedFile) {
        console.log(selectedFile)
        this.setState({
            imageFiles: selectedFile,
            isChange: true
        }, () => {
            const promises = this.state.imageFiles.map(async i => {
                const myFilereader = new FileReader();
                await myFilereader.addEventListener("load", () => {
                    this.setState({
                        imgSrc: [...this.state.imgSrc, myFilereader.result],
                        isLoad: true
                    })
                }, false)
                myFilereader.readAsDataURL(i);
            })
            Promise.all(promises).then(() => {
                this.props.input.onChange(this.state.imageFiles)
            })
        }
        )
    }
    // upload() {
    //     const file = this.state.imageFiles;
    //     this.setState({
    //         isUpLoading: true
    //     })
    //     actions.uploadAvatar(file).then(changed => {
    //         this.setState({
    //             isUpLoading: false,
    //             isSuccess: true,
    //             isChange: false
    //         })
    //     }
    //     )
    // }

    render() {
        const dropzoneStyle = {
            width: "100%",
            height: "20%",
            border: "2px dashed gray",
            borderRadius: "10px",
            backgroundColor: "#f7f7f7"
        };
        { console.log(this.state) }

        return (
            <Fragment>
                <Dropzone onDrop={this.onImageDrop}>
                    {({ getRootProps, getInputProps }) => {
                        return (
                            <div >
                                <div {...getRootProps()} style={dropzoneStyle} className="centered cont" >
                                    <input {...getInputProps()} />
                                    <div className="row">
                                        <div className="col-sm-2">
                                            <i style={{ fontSize: "20px" }} className="fa fa-upload" />
                                        </div>
                                        <div className="col-sm-10">
                                            <p>Chọn ảnh cho địa điểm của bạn</p>
                                            <p>(Chọn hoặc kéo nhiều ảnh 1 lúc)</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }}
                </Dropzone>
                {this.state.isLoad && (
                    <React.Fragment>
                        <img src={this.state.imgSrc[0]} width="22%" style={{ borderRadius: "10px", margin: "5px" }} />
                        <img src={this.state.imgSrc[1]} width="22%" style={{ borderRadius: "10px", margin: "5px" }} />
                        <img src={this.state.imgSrc[2]} width="22%" style={{ borderRadius: "10px", margin: "5px" }} />
                        <img src={this.state.imgSrc[3]} width="22%" style={{ borderRadius: "10px", margin: "5px" }} />
                        <img src={this.state.imgSrc[4]} width="22%" style={{ borderRadius: "10px", margin: "5px" }} />
                        <img src={this.state.imgSrc[5]} width="22%" style={{ borderRadius: "10px", margin: "5px" }} />
                        <img src={this.state.imgSrc[6]} width="22%" style={{ borderRadius: "10px", margin: "5px" }} />
                        <img src={this.state.imgSrc[7]} width="22%" style={{ borderRadius: "10px", margin: "5px" }} />
                    </React.Fragment>)
                }
            </Fragment>
        );
    }
}

export default DropzoneUpload;