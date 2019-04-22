import React, {Component} from 'react';

class Loading extends Component {
    render() {
        return (
            <div>
                <div>
                    <span className="fa fa-cog fa-spin" style={{fontSize:"25px",color:"gray",paddingTop:"150px",paddingBottom:"150px",paddingLeft:"20px",paddingRight:"20px"}}/>
                </div>
            </div>
        );
    }
}

export default Loading;