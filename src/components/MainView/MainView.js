import React, { Component } from 'react';
import { connect } from 'react-redux';

import spinner from '../../assets/loading.svg';

import styled from 'styled-components';
import ElementPan from 'react-element-pan';

const MainViewWrapper = styled.section`
  max-width: calc(100vw - 300px);
  height: 100vh;
  display: flex;
  overflow: hidden;

  margin: 0 auto;
  align-items: center;

  .element-pan {
    width: 100%;
    max-height: 100%;
    display: block;
  }

  .videoLink a {
    color: white;
    font-size: 30px;
    font-weight: 800;
    text-decoration: none;
  }

  img {
    width: ${props => props.width};
  }
`;

class MainView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      imageLoaded: true
    };

    this.handleImageLoad = this.handleImageLoad.bind(this);
    this.buildContent = this.buildContent.bind(this);
  }

  isGreaterThan999px(width) {
    return width === '' ? false : width > 999;
  }

  handleImageLoad(e) {
    this.setState({ imageLoaded: true });
  }

  buildImage(url, width) {
    if (this.isGreaterThan999px(width)) {
      url = this.props.photoData.hdurl;
    }

    return (
      <ElementPan>
        <img id='photoImg'
             src={url}
             alt={this.props.photoData.title}
             onLoad={this.handleImageLoad}/>;
      </ElementPan>
    );
  }

  buildVideo(url) {
    return (
      <div className='videoLink'>
        <a href={url} target='_blank'>External Video Link</a>
      </div>
    );
  }

  buildContent() {
    let content;
    const width = this.props.width;
    let url = this.props.photoData.url;

    if (this.props.photoData.media_type === 'image') {
      content = this.buildImage(url, width);
    } else if (this.props.photoData.media_type === 'video') {
      content = this.buildVideo(url);
    }

    return content;
  }

  buildSpinner() {
    return (
      <div className='loading'>
        <img className='spinner'
             src={spinner}
             alt='Loading Spinner' />
        Loading Image
      </div>
    );
  }

  render() {
    const content = this.buildContent();
    const spinner = this.buildSpinner();

    return (
      <MainViewWrapper width={`${this.props.width}px`}>
        { this.state.imageLoaded ? content : spinner }
      </MainViewWrapper>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  photoData: state.photo.data,
  loading: state.loading.photoData,
  date: state.request.date,
  width: state.request.width,
});

export default connect(
  mapStateToProps,
  null
)(MainView);
