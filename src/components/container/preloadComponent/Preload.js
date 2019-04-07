import React, { Component } from 'react';
import './preload.scss'

export default class Preload extends Component{

    render(){

        return(
          <div className="preload" ref={(c) => this.preload = c } >
            <div className="spring-spinner">
              <div className="spring-spinner-part top">
                <div className="spring-spinner-rotator"></div>
              </div>
              <div className="spring-spinner-part bottom">
                <div className="spring-spinner-rotator"></div>
              </div>
            </div>
          </div>
        )
    }
}
