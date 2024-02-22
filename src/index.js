import React, {useRef} from 'react';
import {View, Animated, Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');
import Responsive from './Responsive';

import {AnimatedFlashList} from '@shopify/flash-list';
import Carousel from 'react-native-reanimated-carousel';

const ITEM_LENGTH = width * 1.0; // Item is a square. Therefore, its height and width are of the same length.
const CURRENT_ITEM_TRANSLATE_Y = 18;
const EMPTY_ITEM_LENGTH = (width - ITEM_LENGTH) / 2;

export default function CircleAnimationList(props) {
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems?.length > 0) {
      const vIndex = viewableItems[0]?.index;
      props?.verticalCurrentIndex && props?.verticalCurrentIndex(vIndex);
    }
  }).current;

  const renderHorizontalSlider = ({item, index}) => {
    if (index === 0) {
      return (
        <View
          style={{
            width: EMPTY_ITEM_LENGTH,
          }}
        />
      );
    }

    const inputRange = [
      (index - 3.0) * ITEM_LENGTH,
      (index - 2.0) * ITEM_LENGTH,
      (index - 1.0) * ITEM_LENGTH,
      index * ITEM_LENGTH,
      (index + 1.0) * ITEM_LENGTH,
      (index + 2.0) * ITEM_LENGTH,
      (index + 3.0) * ITEM_LENGTH,
    ];

    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [
        props?.circleAnimationAtLeftSide ? 300 : -300 /* Bottom Scroll */,
        props?.horizontalSpacingLeftToRightPosition
          ? props?.circleAnimationAtLeftSide
            ? Math.abs(props.horizontalSpacingLeftToRightPosition * 6)
            : props?.horizontalSpacingLeftToRightPosition
          : 0 /* Bottom Object left-right */,
        props?.centerObjectLeftToRightPosition
          ? props?.centerObjectLeftToRightPosition
          : 120 /* Center Object left-right */,
        props?.horizontalSpacingLeftToRightPosition
          ? props?.circleAnimationAtLeftSide
            ? Math.abs(props.horizontalSpacingLeftToRightPosition * 6)
            : props?.horizontalSpacingLeftToRightPosition
          : 0 /* Top Object left-right */,
        props?.circleAnimationAtLeftSide ? 300 : -300 /* Top Scroll */,
        -2000,
        -2000,
      ],
    });

    const translateY = scrollX.interpolate({
      inputRange,
      outputRange: [
        CURRENT_ITEM_TRANSLATE_Y * 2.0,
        CURRENT_ITEM_TRANSLATE_Y * props?.bottomObjectUpToDownPosition
          ? props?.bottomObjectUpToDownPosition
          : -5, // Bottom Object Top-Margin
        CURRENT_ITEM_TRANSLATE_Y * -1, // Center Object Top-Margin
        CURRENT_ITEM_TRANSLATE_Y * props?.topObjectUpToDownPosition
          ? props?.topObjectUpToDownPosition
          : 3, // Top object Up-Down
        CURRENT_ITEM_TRANSLATE_Y * 10.8,
        CURRENT_ITEM_TRANSLATE_Y * 10.8,
        CURRENT_ITEM_TRANSLATE_Y * 10.8,
      ],
    });

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8],
    });

    return (
      <Animated.View
        style={[
          {
            transform: [{translateX}, {scale}, {translateY}],
            paddingTop: index === 1 && props?.marginTopForFirstIndex,
          },
        ]}>
        {props?.isHorizontalArray &&
        props?.secondArrayName !== '' &&
        props?.secondArrayName !== 'null' &&
        props?.secondArrayName !== undefined ? (
          <View style={styles.carouselContainer}>
            <Carousel
              key={index}
              autoPlay={false}
              // renderItem={value => props?.renderItem(item, index)}
              renderItem={renderHorizontalItem}
              loop={props?.horizontalListInLoop && props?.horizontalListInLoop}
              enabled={props?.horizontalScrollEnabled}
              data={item[props?.secondArrayName] || []}
              ref={ref =>
                props?.horizontalListRef && props?.horizontalListRef(ref)
              }
              height={ITEM_LENGTH}
              width={Responsive.widthPercentageToDP(250)}
              scrollAnimationDuration={props?.horizontalAnimation}
              snapToInterval={Responsive.widthPercentageToDP(100)}
              onSnapToItem={value =>
                props?.horizontalCurrentIndex &&
                props?.horizontalCurrentIndex(value)
              }
              panGestureHandlerProps={{
                activeOffsetX: [-10, 10],
              }}
            />
          </View>
        ) : (
          <View style={styles.singleRender}>
            {props?.renderItem(item, index)}
          </View>
        )}
      </Animated.View>
    );
  };

  const renderHorizontalItem = ({item, index}) => {
    return props?.renderItem(item, index);
  };

  return (
    <View style={styles.container}>
      {props?.data?.length > 0 && (
        <AnimatedFlashList
          data={props?.data || []}
          ref={ref => props?.verticalListRef && props?.verticalListRef(ref)}
          numColumns={1}
          drawDistance={0}
          disableAutoLayout
          renderAheadOffset={200}
          scrollEventThrottle={16}
          // enableEmptySections={true}
          decelerationRate={
            props?.verticalAnimation ? props?.verticalAnimation : 'normal'
          }
          snapToInterval={ITEM_LENGTH}
          disableIntervalMomentum={true}
          renderToHardwareTextureAndroid
          renderItem={renderHorizontalSlider}
          showsVerticalScrollIndicator={props?.showsVerticalScrollIndicator}
          extraData={props?.extraData}
          onEndReached={props?.onEndReached}
          scrollEnabled={props?.verticalScrollEnabled}
          onEndReachedThreshold={props?.onEndReachedThreshold}
          estimatedItemSize={props?.data?.length * 100}
          contentContainerStyle={styles.contentContainer}
          keyExtractor={(item, index) => index.toString()}
          ListFooterComponent={props?.listFooterComponent}
          onViewableItemsChanged={handleViewableItemsChanged}
          maintainVisibleContentPosition={{
            minIndexForVisible: props?.data?.length * 10000000,
          }}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollX}}}],
            {
              useNativeDriver: true,
            },
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: Responsive.heightPercentageToDP(30),
  },
  carouselContainer: {
    marginLeft: Responsive.widthPercentageToDP(-60),
  },
  singleRender: {
    height: ITEM_LENGTH,
    width: Responsive.widthPercentageToDP(250),
    marginLeft: Responsive.widthPercentageToDP(-60),
  },
});
