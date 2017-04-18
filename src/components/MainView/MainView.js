import React, { Component } from 'react';
import { connect } from 'react-redux';

import styled from 'styled-components';
import ElementPan from 'react-element-pan';

const MainViewWrapper = styled.section`
  max-width: calc(100% - 300px);
  margin: 0 auto;
  height: 100vh;
  overflow: hidden;

  display: flex;
  align-items: center;

  .element-pan {
    display: block;
    max-height: 100%;
    width: 100%;
  }

  .videoLink a {
    margin-top: 50px;
    color: white;
    text-decoration: none;
    font-weight: 800;
    font-size: 20px;
  }

  img {
    width: ${props => props.width};
  }
`;

class MainView extends Component {
  isGreaterThan999px(widthString) {
    if (widthString === '') {
      return false;
    }

    const width = widthString.slice(0, widthString.length - 2);
    return width > 999;
  }

  buildImage(url, width) {
    if (this.isGreaterThan999px(width)) {
      url = this.props.photoData.hdurl;
    }

    return (
      <ElementPan>
        <img id='photoImg'
             src={url}
             alt={this.props.photoData.title}/>;
      </ElementPan>
    );
  }

  render() {
    if (this.props.loading) {
      return (
        <div className='loading'>Loading Image</div>
      );
    } else {
      let content;
      const width = this.props.width;
      let url = this.props.photoData.url;

      if (this.props.photoData.media_type === 'image') {
        content = this.buildImage(url, width);
      } else if (this.props.photoData.media_type === 'video') {
        content =
          <div className='videoLink'>
            <a href={url} target='_blank'>External Video Link</a>
          </div>;
      }

      return (
        <MainViewWrapper width={width}>
          { content }
        </MainViewWrapper>
      );
    }
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
