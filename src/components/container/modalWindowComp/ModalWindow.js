import React, { Component } from 'react';
import './modalWindow.scss'

export default class ModalWindow extends Component{

    closeWindow(){
        const alert = this.modalWindow;
        alert.style.display = 'none';

        this.props.preload.preload.style.visibility = 'hidden';
      }
    
    render(){
        
        return(
            <div className="modal-window" ref={(c) => this.modalWindow = c }>
                <div className="alert-window">
                    <p>{this.props.notFound}</p>
                    <button onClick={() => this.closeWindow()}>OK</button>
                </div>
          </div>
        )
    }
}