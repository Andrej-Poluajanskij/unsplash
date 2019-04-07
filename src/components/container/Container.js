import React, { Component } from 'react';
import './Container.scss';
import Preload from './preloadComponent/Preload'
import ModalWindow from './modalWindowComp/ModalWindow'

import Unsplash, { toJson } from 'unsplash-js';

const unsplash = new Unsplash({
  applicationId: "25c4b86197be0779561a0ff1c4f13d059722ef8eba998d4d13aa2939c8643800",
  secret: "cfe6fc2b39ea3d065aa4bf49a515b3e27f6aeb9d7c179f96a2b0fbca6ab82fdf"
});


class Container extends Component{
  constructor(){
    super()
    this.state = { queries: [], url: [], notFound: '', preload:{} }
  
  }
  
  getInputValue = (element) => {
    const image = this.refs.image
    image.src = '' ;
    
    this.preload.preload.style.visibility = 'visible';

    this.setState({
      preload: this.preload
    }) 
        
        unsplash.search.photos(element, 1)
        .then(toJson)
        .then(json => {
          if(json.results[0] === undefined ){
           
            if(element === ''){
              this.setState({
                notFound: `Search window is empty`
              })
            }else{
              this.setState({
                notFound: `${element} not found`
              })
            }
           
            this.alertWindow()

          } else {
            let jsonData = json.results[0].urls.regular;

            if (jsonData === this.state.url) {
                image.src=this.state.url
            } else {
              this.setState({
                url: jsonData
              })
            }
        }
        });
      }


    saveQuery(element){
 
      if(element !== ''){
        this.setState({
          queries: [...this.state.queries, element]
        })
      }

      this.refs.mySearch.value = ''
      }

    alertWindow(){
      const alert = this.modalWindow.modalWindow;
      alert.style.display = 'block'

      window.onclick = (event) => {
        if (event.target === alert) {
          alert.style.display = "none";
          this.preload.preload.style.visibility = 'hidden';
        }
      }
    }

    closeWindow(){
      const alert = this.refs.modalWindow;
      alert.style.display = 'none';

      this.preload.preload.style.visibility = 'hidden';
    }

    imageLoaded(){
      this.preload.preload.style.visibility = 'hidden';
    }

    render(){
        return (
            <div className="container">
              <ModalWindow ref={(c) => this.modalWindow = c }
               preload={this.state.preload} notFound={this.state.notFound} />
           
                <div className="content">

                    <div className="content-left">

                        <input className="input" placeholder="Search photo" ref="mySearch" />
                        <div className="img" >

                          <Preload ref={(c) => this.preload = c} /> 
                          <img ref="image" className="image" src={this.state.url}
                           onLoad={this.imageLoaded.bind(this)} alt=""/>

                        </div>
                    </div>

                    <div className="content-right">
                        <div className="buttons">
                            <button onClick={() => this.getInputValue(this.refs.mySearch.value)}>Search</button>
                            <button onClick={() => this.saveQuery(this.refs.mySearch.value)}>Save</button>
                        </div>
                        <div className="saved-queries">
                             <ul>
                                { this.state.queries.map( (item, i) =>  {
                                    return <li key={i} onClick={() => this.getInputValue(item)} >{item}</li>
                                 })}
                             </ul>
                        </div>
                    </div>
              
              </div>
            </div>
          );
    }
}

export default Container