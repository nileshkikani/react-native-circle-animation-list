import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import CircleAnimationList from 'react-native-circle-animation';

function App() {
  const verticalArray = [
    {
      id: 0,
      img: 'https://picsum.photos/200',
      horizontalArray: [
        {
          id: 0,
          img: 'https://picsum.photos/200',
        },
        {
          id: 1,
          img: 'https://picsum.photos/200',
        },
        {
          id: 2,
          img: 'https://picsum.photos/200',
        },
      ],
    },
    {
      id: 1,
      img: 'https://picsum.photos/200',
      horizontalArray: [
        {
          id: 0,
          img: 'https://picsum.photos/200',
        },
        {
          id: 1,
          img: 'https://picsum.photos/200',
        },
        {
          id: 2,
          img: 'https://picsum.photos/200',
        },
      ],
    },
    {
      id: 2,
      img: 'https://picsum.photos/200',
      horizontalArray: [
        {
          id: 0,
          img: 'https://picsum.photos/200',
        },
        {
          id: 1,
          img: 'https://picsum.photos/200',
        },
        {
          id: 2,
          img: 'https://picsum.photos/200',
        },
      ],
    },
    {
      id: 3,
      img: 'https://picsum.photos/200',
      horizontalArray: [
        {
          id: 0,
          img: 'https://picsum.photos/200',
        },
        {
          id: 1,
          img: 'https://picsum.photos/200',
        },
        {
          id: 2,
          img: 'https://picsum.photos/200',
        },
      ],
    },
    {
      id: 4,
      img: 'https://picsum.photos/200',
      horizontalArray: [
        {
          id: 0,
          img: 'https://picsum.photos/200',
        },
        {
          id: 1,
          img: 'https://picsum.photos/200',
        },
        {
          id: 2,
          img: 'https://picsum.photos/200',
        },
      ],
    },
    {
      id: 5,
      img: 'https://picsum.photos/200',
      horizontalArray: [
        {
          id: 0,
          img: 'https://picsum.photos/200',
        },
        {
          id: 1,
          img: 'https://picsum.photos/200',
        },
        {
          id: 2,
          img: 'https://picsum.photos/200',
        },
      ],
    },
  ];

  // const verticalArray = [
  //   {
  //     id: 0,
  //     img: 'https://picsum.photos/200',
  //   },
  //   {
  //     id: 1,
  //     img: 'https://picsum.photos/200',
  //   },
  //   {
  //     id: 2,
  //     img: 'https://picsum.photos/200',
  //   },
  //   {
  //     id: 3,
  //     img: 'https://picsum.photos/200',
  //   },
  //   {
  //     id: 4,
  //     img: 'https://picsum.photos/200',
  //   },
  //   {
  //     id: 5,
  //     img: 'https://picsum.photos/200',
  //   },
  // ];

  const renderHorizontalSlider = (item, index) => {
    return (
      <View style={styles.container}>
        <View style={styles.circle}>
          <Image style={styles.circle} source={{uri: item.img}} />
        </View>
      </View>
    );
  };

  const onEndReached = () => {
    // console.log('=== onEndReached ===');
  };

  const renderFooterLoader = () => {
    // console.log('=== renderFooterLoader ===');
  };

  return (
    <View style={{flex: 1}}>
      <CircleAnimationList
        data={verticalArray}
        extraData={true}
        secondArrayName={'horizontalArray'}
        isHorizontalArray={true}
        verticalAnimation={'fast'}
        onEndReached={onEndReached}
        horizontalAnimation={500}
        circleAnimationAtLeftSide={false}
        horizontalSpacingLeftToRightPosition={-50}
        centerObjectLeftToRightPosition={120}
        topObjectUpToDownPosition={15}
        bottomObjectUpToDownPosition={-55}
        horizontalListInLoop={false}
        verticalScrollEnabled={true}
        horizontalScrollEnabled={true}
        marginTopForFirstIndex={300}
        showsVerticalScrollIndicator={false}
        listFooterComponent={renderFooterLoader}
        onEndReachedThreshold={0.0000000001}
        renderItem={(item, index) => renderHorizontalSlider(item, index)}
        verticalListRef={ref => console.log(ref)}
        horizontalListRef={ref => console.log(ref)}
        verticalCurrentIndex={value => console.log('verticalIndex =>', value)}
        horizontalCurrentIndex={value =>
          console.log('horizontalIndex =>', value)
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 100,
    width: 350,
  },
  circle: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    width: 300,
    height: 300,
    borderRadius: 150,
  },
  txt: {color: 'red', fontSize: 35},
});

export default App;
