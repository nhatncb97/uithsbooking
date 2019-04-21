import React, { Component } from 'react';
import Dropzone from 'react-dropzone'
import * as actions from 'actions'
class UserAvatar extends Component {
    constructor(props) {
        super(props);
        this.onImageDrop = this.onImageDrop.bind(this);
        this.upload = this.upload.bind(this);
        this.state = {
            imageFiles: [],
            imgSrc: '',
            isChange: false,
            isUpLoading: false,
            isSuccess: false
        }
    }
    onImageDrop(selectedFile) {
        this.setState({
            imageFiles: selectedFile[0],
            isChange: true
        })
        const myFilereader = new FileReader();
        myFilereader.addEventListener("load", () => {
            this.setState({
                imgSrc: myFilereader.result
            })
        }, false)
        myFilereader.readAsDataURL(this.state.imageFiles);
    }
    upload() {
        const file = this.state.imageFiles;
        this.setState({
            isUpLoading: true
        })
        actions.uploadAvatar(file).then(changed => {
            this.setState({
                isUpLoading: false,
                isSuccess: true,
                isChange: false
            })
        }
        )
    }
    render() {
        return (
            <div className="usercontent">
                <div>
                    <h3 style={{ textAlign: "center" }}>Upload ảnh đại diện</h3>
                </div>
                <br />
                <hr />
                {/* <div className="centered cont" style={{ marginTop: "20px" }}>
                    <img src={"/img/img_avatar.png"} className="image" />
                    <div className="middle">
                        <div>
                            <button type="submit" className="btn btn-primary">
                                <i className="fa fa-camera" /></button>
                        </div>
                    </div>
                </div> */}
                <Dropzone onDrop={this.onImageDrop}>
                    {({ getRootProps, getInputProps }) => {
                        return (
                            <div >
                                <div {...getRootProps()} className="centered cont" style={{ margin: "auto", width: "150px", marginTop: "20px" }}>
                                    <input {...getInputProps()} />
                                    {this.state.imgSrc.length > 0 ? <img style={{ minHeight: "150px", minWidth: "150px", width:"150px",height:"150px" }} className="image" src={this.state.imgSrc} />
                                        : <img src={this.props.img} style={{ minHeight: "150px", minWidth: "150px", width:"150px", height:"150px" }} className="image" />}
                                
                                </div>
                            </div>
                        )
                    }}
                </Dropzone>
                <hr />
               
                <div>
                    <div className="col-lg-4">
                    </div>
                    <div className="col-lg-4">
                    {
                        this.state.isSuccess && 
                        <div class="boxtrue">Đổi Avatar Thành công</div>
                    }
                    <br/>
                    { this.state.isChange ? (this.state.isUpLoading ?<button disabled type="submit" className="b b1 center_button">Uploading....</button>:
                    <button onClick={this.upload} type="submit" className="b b1 center_button">Lưu thay đổi</button>)
                        :<div></div>
                    }
                        </div>
                    <div className="col-lg-4">
                    </div>
                </div>
                <br />
                <br />
            </div>
        );
    }
}

export default UserAvatar;