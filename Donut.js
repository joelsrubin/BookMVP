// import React, { useRef, useState, useEffect, useContext } from 'react';
// import { Animated, ActivityIndicator, Button, StyleSheet, Text, View } from 'react-native';
// // import Svg, { G, Circle } from 'react-native-svg';
// const AnimatedCircle = Animated.createAnimatedComponent(Circle)

// function Donut({
//   percentage = 75,
//   radius = 40,
//   strokeWidth = 10,
//   duration = 500,
//   color = 'tomato',
//   delay = 0,
//   textColor,
//   max = 100,
// }) {

//   const animated = useRef(new Animated.Value(0)).current;
//   const circleRef = useRef()
//   const halfCircle = radius + strokeWidth;
//   const circumference = 2 * Math.PI * radius;

//   const animation = (toValue) => {
//     return Animated.timing(animated, {
//       toValue,
//       duration,
//       delay,
//       useNativeDriver: true
//     }).start()
//   }


//   React.useEffect(() => {
//     animation(percentage);
//     animated.addListener((v) => {
//       const maxPerc = 100 * v.value / max;
//       const strokeDashoffset = circumference - (circumference * maxPerc) / 100;

//       if (circleRef?.current) {
//         circleRef.current.setNativeProps({
//           strokeDashoffset,
//         });
//       }
//     }, [max, percentage]);

//     return () => {
//       animated.removeAllListeners();
//     };
//   });
//   return (
//     <View style={styles.container}>
//       <Svg width={radius * 2} height={radius * 2} viewBox={`0 0 ${halfCircle * 2} ${halfCircle * 2}`}>
//         <G origin={`${halfCircle}, ${halfCircle}`} >
//           <Circle
//             cx='50%'
//             cy='50%'
//             stroke={color}
//             strokeWidth={strokeWidth}
//             r={radius}
//             fill="transparent"
//             strokeOpacity={0.2} />
//           <AnimatedCircle
//             ref={circleRef}
//             cx='50%'
//             cy='50%'
//             stroke={color}
//             strokeWidth={strokeWidth}
//             r={radius}
//             fill="transparent"
//             strokeDasharray={circumference}
//             strokeDashoffset={circumference}
//             strokeLinecap="round" />
//         </G>
//       </Svg>
//     </View>
//   )


// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 15,
//   },
//   titleText: {
//     fontSize: 30,
//     fontWeight: "bold"
//   },
// })