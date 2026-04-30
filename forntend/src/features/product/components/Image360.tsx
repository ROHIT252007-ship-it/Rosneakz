import React, {useMemo, useRef, useState} from 'react';
import {
  Image,
  PanResponder,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { useResponsive } from '../../../shared/hooks/responsive';

const shoeImages = [
  require('../../../assets/image/Nike Air Max Alpha ligth blue/shoe_01.png'),
  require('../../../assets/image/Nike Air Max Alpha ligth blue/shoe_02.png'),
  require('../../../assets/image/Nike Air Max Alpha ligth blue/shoe_03.png'),
  require('../../../assets/image/Nike Air Max Alpha ligth blue/shoe_04.png'),
  require('../../../assets/image/Nike Air Max Alpha ligth blue/shoe_05.png'),
  require('../../../assets/image/Nike Air Max Alpha ligth blue/shoe_06.png'),
  require('../../../assets/image/Nike Air Max Alpha ligth blue/shoe_07.png'),
  require('../../../assets/image/Nike Air Max Alpha ligth blue/shoe_08.png'),
//   require('../../../assets/image/Nike Air Max Alpha ligth blue/shoe_09.png'),
//   require('../../../assets/image/Nike Air Max Alpha ligth blue/shoe_10.png'),
  // require('../../../assets/image/Nike Air Max Alpha ligth blue/shoe_11.png'),
//   require('../../../assets/image/Nike Air Max Alpha ligth blue/shoe_12.png'),
];

const Shoe360View = () => {
  const [index, setIndex] = useState(0);
  const lastIndex = useRef(0);
const {wp,hp}=useResponsive();
  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,

        onPanResponderMove: (_, gestureState) => {
          const sensitivity = 18; // lower = faster rotation
          const change = Math.floor(gestureState.dx / sensitivity);

          if (change !== 0) {
            let nextIndex = lastIndex.current - change;

            nextIndex =
              ((nextIndex % shoeImages.length) + shoeImages.length) %
              shoeImages.length;

            setIndex(nextIndex);
          }
        },

        onPanResponderRelease: () => {
          lastIndex.current = index;
        },
      }),
    [index],
  );

  return (
    <View style={styles.container}>
        <View style={styles.imageBox} {...panResponder.panHandlers}>
        <Image
          source={shoeImages[index]}
          style={[
            styles.image,
            { width: wp(90), height: hp(30) },
          ]}
          resizeMode="contain"
        />
      </View>
    </View>
  );
};


export default Shoe360View;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  hint: {
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
  },
  imageBox: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    borderRadius: 16,
  },
  counter: {
    marginTop: 8,
    fontSize: 13,
    color: '#777',
  },
});