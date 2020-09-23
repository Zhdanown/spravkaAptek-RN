import React from 'react';

import PharmContent from './PharmContent';
import Card from '../../components/Card';
import { calculateDistance } from '../../utils';

class PharmacyCard extends React.PureComponent {
  render() {
    const pharmacy = this.props.item;
    const { address, is_work_now: isOpenNow } = this.props.item;
    const { location, distance, isTrackingLocation } = this.props;

    const pharmProps = {
      distance,
      pharmacy,
      address,
      isOpenNow,
      location,
      isTrackingLocation,
    };

    return (
      <Card onPress={this.props.onOpen}>
        <PharmContent {...pharmProps} />
      </Card>
    );
  }
}

export default withDistance(PharmacyCard);

function withDistance(Component) {
  return props => {
    const { latitude, longitude } = props.item;
    const { location } = props;
    const distance = location
      ? calculateDistance(location, { latitude, longitude })
      : null;
    return <Component {...props} distance={distance} />;
  };
}
