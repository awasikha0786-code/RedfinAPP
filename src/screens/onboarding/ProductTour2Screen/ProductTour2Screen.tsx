// import React from 'react';
// import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Text as RNText } from 'react-native';
// import { Button } from '../../../components/common/Button';
// import { Text } from '../../../components/common/Text';
// import { ProductTourHeader } from '../../../components/common/ProductTourHeader';
// import { PropertyImage } from '../../../components/common/PropertyImage';
// import { COLORS, BUTTON_SIZES } from '../../../constants/index';

// interface ProductTour2ScreenProps {
//   navigation: any; // TODO: Add proper navigation type
// }

// const ProductTour2Screen: React.FC<ProductTour2ScreenProps> = ({ navigation }) => {
//   const handleNextPress = () => {
//     navigation.navigate('ProductTour3');
//   };

//   const handleSkipPress = () => {
//     navigation.navigate('MainStack');
//   };

//   const handleBackPress = () => {
//     navigation.goBack();
//   };
//   return (
//     <View style={styles.container}>
//       {/* Header with Logo and Skip Button */}
//       <ProductTourHeader onSkipPress={handleSkipPress} />
      
//       <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
//         {/* Main Content */}
//         <View style={styles.textContainer}>
//           <Text variant="headline" style={styles.headline}>
//             {`Sell your home faster
// with Redfin agents`}
//           </Text>
//          <Text style={styles.subHeadline}>
//             {`List with Redfin and reach more buyers
// while saving on fees.`}
//           </Text>
//         </View>
        
//         {/* Property Image Card */}
//         <View style={styles.imageContainer}>
//           <PropertyImage
//             source={require('../../../assets/images/image1.png')}
//             style={styles.propertyImage}
//             overlayColor="#000000"
//             overlayOpacity={0.1}
//           />
          
//           {/* Next Button Overlay */}
//           <View style={styles.buttonContainer}>
//             <View style={styles.buttonWrapper}>
//               <TouchableOpacity 
//                 style={styles.backArrowContainer}
//                 onPress={handleBackPress}
//                 activeOpacity={0.7}
//               >
//                 <Image 
//                   source={require('../../../assets/icons/arrow.png')} 
//                   style={styles.backArrowIcon}
//                   resizeMode="contain"
//                 />
//               </TouchableOpacity>
//               <Button
//                 title="Next"
//                 onPress={handleNextPress}
//                 style={styles.nextButton}
//               />
//             </View>
//           </View>
//         </View>
//       </ScrollView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//   },
//   content: {
//     flex: 1,
//   },
//   textContainer: {
//     paddingHorizontal: 20,
//     paddingTop: 10,
//     paddingBottom: 20,
//   },
//   headline: {
//     width: 248,
//     height: 80,
//     marginTop: 10,
//     marginBottom: 16,
//     color: '#252B5C',
//     fontFamily: 'Lato',
//     fontWeight: '500',
//     fontSize: 25,
//     lineHeight: 40,
//     letterSpacing: 0.03 * 25,
//     textAlign: 'left',
//   },
//   subHeadline: {
//     width: 216,
//     height: 40,
//     marginLeft: 4,
//     color: '#546273',
//     fontFamily: 'Lato',
//     fontWeight: '400',
//     fontSize: 12,
//     lineHeight: 20,
//     letterSpacing: 0.36,
//   },
//   imageContainer: {
//     flex: 1,
//     marginHorizontal: 20,
//     marginBottom: 20,
//     position: 'relative',
//     minHeight: 500,
//   },
//   propertyImage: {
//     width: '100%',
//     height: 500,
//     borderRadius: 40,
//   },
//   buttonContainer: {
//     position: 'absolute',
//     bottom: 20,
//     left: 20,
//     right: 20,
//     alignItems: 'center',
//   },
//   buttonWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 15,
//   },
//   backArrowContainer: {
//     width: 54,
//     height: 54,
//     backgroundColor: '#ffffff',
//     borderRadius: 27,
//     justifyContent: 'center',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   backArrowIcon: {
//     width: 24,
//     height: 24,
//     opacity: 1,
//     transform: [{ rotate: '0deg' }],
//   },
//   nextButton: {
//     width: 190,
//     height: 54,
//     borderRadius: 10,
//     backgroundColor: '#DE3341',
//   },
// });

// export default ProductTour2Screen;
import React from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Text as RNText } from 'react-native';
import { Button } from '../../../components/common/Button';
import { ProductTourHeader } from '../../../components/common/ProductTourHeader';
import { PropertyImage } from '../../../components/common/PropertyImage';
import { BUTTON_SIZES } from '../../../constants/index';
import { scale, verticalScale, moderateScale, responsiveWidth } from '../../../utils/layout';

interface ProductTour2ScreenProps {
  navigation: any; // TODO: Add proper navigation type
}

const ProductTour2Screen: React.FC<ProductTour2ScreenProps> = ({ navigation }) => {
  const handleNextPress = () => {
    navigation.navigate('ProductTour3');
  };

  const handleSkipPress = () => {
    navigation.navigate('MainStack');
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header with Logo and Skip Button */}
      <ProductTourHeader onSkipPress={handleSkipPress} />

      <ScrollView
        style={styles.content}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Main Content */}
        <View style={styles.textContainer}>
          <RNText style={styles.headline}>
            <RNText style={styles.headlineMuted}>{'Sell your home faster\nwith '}</RNText>
            <RNText style={styles.headlineHighlight}>{'Redfin agents'}</RNText>
          </RNText>
          <RNText style={styles.subHeadline}>
            {`List with Redfin and reach more buyers\nwhile saving on fees.`}
          </RNText>
        </View>

        {/* Property Image Card */}
        <View style={styles.imageContainer}>
          <PropertyImage
            source={require('../../../assets/images/image1.png')}
            style={styles.propertyImage}
            overlayColor="#000000"
            overlayOpacity={0.1}
          />

          {/* Next Button Overlay */}
          <View style={styles.buttonContainer}>
            <View style={styles.buttonWrapper}>
              <TouchableOpacity 
                style={styles.backArrowContainer}
                onPress={handleBackPress}
                activeOpacity={0.7}
              >
                <Image 
                  source={require('../../../assets/icons/arrow.png')} 
                  style={styles.backArrowIcon}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <Button
                title="Next"
                onPress={handleNextPress}
                style={styles.nextButton}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: verticalScale(32),
  },
  textContainer: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(32), // top spacing updated
    paddingBottom: verticalScale(20),
    alignItems: 'flex-start',
  },
  headline: {
    marginBottom: 16,
    textAlign: 'left',
    width: '100%', // responsive width
  },
  headlineMuted: {
    color: '#252B5C',
    fontFamily: 'Lato',
    fontWeight: '500',
    fontSize: moderateScale(25),
    lineHeight: verticalScale(40),
    letterSpacing: 0.03 * 25,
  },
  headlineHighlight: {
    color: '#204D6C',
    fontFamily: 'Lato',
    fontWeight: '800',
    fontSize: moderateScale(25),
    lineHeight: verticalScale(40),
    letterSpacing: 0.03 * 25,
  },
  subHeadline: {
    color: '#546273',
    fontFamily: 'Lato',
    fontWeight: '400',
    fontSize: moderateScale(12),
    lineHeight: verticalScale(20),
    letterSpacing: 0.36,
    width: responsiveWidth(85), // responsive width
  },
  imageContainer: {
    flex: 1,
    marginHorizontal: scale(20),
    marginBottom: verticalScale(24),
    position: 'relative',
    minHeight: verticalScale(560),
  },
  propertyImage: {
    width: '100%',
    height: verticalScale(560),
    borderRadius: scale(32),
  },
  buttonContainer: {
    position: 'absolute',
    bottom: verticalScale(24),
    left: scale(20),
    right: scale(20),
    alignItems: 'center',
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(15),
  },
  backArrowContainer: {
    width: scale(54),
    height: scale(54),
    backgroundColor: '#FFFFFF',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(12),
    shadowColor: '#8BC83D',
    shadowOffset: {
      width: 0,
      height: verticalScale(17),
    },
    shadowOpacity: 0.25,
    shadowRadius: 40,
    elevation: 12,
  },
  backArrowIcon: {
    width: scale(16),
    height: scale(15.56),
    opacity: 1,
    transform: [{ rotate: '0deg' }],
  },
  nextButton: {
    width: scale(190),
    height: verticalScale(54),
    borderRadius: scale(10),
    backgroundColor: '#DE3341',
  },
});

export default ProductTour2Screen;
