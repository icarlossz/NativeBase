import React, { Component } from 'react';

import { Platform } from 'react-native';
import { connectStyle } from '@shoutem/theme';

import { IconNB } from './../IconNB';
import ic from './NBIcons.json';

import mapPropsToStyleNames from '../../Utils/mapPropsToStyleNames';

class Icon extends Component {

  getName() {
    let n = this.props.name.indexOf('ios-');
    let m = this.props.name.indexOf('md-');
    if(n != -1 || m != -1){
      return this.props.name;
    }
    else {
      if (Platform.OS === 'ios') {
        return (this.props.active) ? ic[this.props.name].ios.active : ic[this.props.name].ios.default;
      } else {
        return (this.props.active) ?
        ic[this.props.name].android.active : ic[this.props.name].android.default;
      }
    }
  }

  getIconName() {
    if (Platform.OS === 'ios') {
      if (this.props.ios) {
        return this.props.ios;
      } else {
        return (this.props.active) ?
        ic[this.props.name].ios.active : ic[this.props.name].ios.default;
      }
    } else if(this.props.android) {
      return this.props.android;
    } else {
      return (this.props.active) ?
      ic[this.props.name].android.active : ic[this.props.name].android.default;
    }
  }

  render() {
    if (this.props.ios && this.props.android) {
      return (
        <IconNB ref={c => this._root = c} {...this.props} name={(Platform.OS === 'ios') ? this.props.ios : this.props.android} />
      );
    } else if (this.props.name && (this.props.android || this.props.ios)) {
      return (
        <IconNB ref={c => this._root = c} {...this.props} name={this.getIconName()} />
      );
    } else {
      return (
        <IconNB ref={c => this._root = c} {...this.props} name={this.getName()} />
      );
    }
  }
}

Icon.propTypes = {
  ...IconNB.propTypes,
  style: React.PropTypes.object,
  name: React.PropTypes.string,
  ios: React.PropTypes.string,
  android: React.PropTypes.string,
  active: React.PropTypes.bool,
};

const StyledIcon = connectStyle('NativeBase.Icon', {}, mapPropsToStyleNames)(Icon);

export {
  StyledIcon as Icon,
};
