import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { colors, padding } from './../../assets/styles/base';

export default class CustomIcon extends React.Component {
  render() {
    const dimension = this.props.dimension || 36

    const icons = {
      keyboardArrowLeft: {
        type: 'Material',
        size: 28,
        styles:{ 
          color: colors.blue, 
          paddingLeft: 0,
          paddingTop: 2,
          
        }
      },
      close: {
        type: 'Material',
        size: 24,
        styles: { 
          color: colors.blue, 
          paddingTop:1,
          paddingLeft:1
        }
      },
      menu: {
        type: 'Material',
        size: 22,
        styles: {
          color: colors.blue, 
          paddingLeft: 1,
          paddingTop: 1, 
        }
      },
      person: {
        type: 'Material',
        size: 28,
        styles: {
          color: colors.blue, 
          paddingLeft: 1,
          paddingTop: 1, 
        }
      },
      noteAdd: {
        type: 'Material',
        size: 26,
        styles: {
          color: colors.blue, 
          paddingLeft: 1,
          paddingTop: 1, 
        }
      },
      
      scan:{
        type: 'svg',
        size: 18,
        path: "M11.875,10 L28.125,10 C29.1605339,10 30,10.8394661 30,11.875 L30,28.125 C30,29.1605339 29.1605339,30 28.125,30 L11.875,30 C10.8394661,30 10,29.1605339 10,28.125 L10,11.875 C10,10.8394661 10.8394661,10 11.875,10 Z M11.6428571,11 C11.2878169,11 11,11.2878169 11,11.6428571 L11,28.3571429 C11,28.712183 11.2878169,29 11.6428571,29 L28.3571429,29 C28.712183,29 29,28.712183 29,28.3571429 L29,11.6428571 C29,11.2878169 28.712183,11 28.3571429,11 L11.6428571,11 Z M13,26.4 L13,24.3 C13,24.1343146 13.1343146,24 13.3,24 C13.4656854,24 13.6,24.1343146 13.6,24.3 L13.6,26.25 C13.6,26.3328427 13.6671573,26.4 13.75,26.4 L15.7,26.4 C15.8656854,26.4 16,26.5343146 16,26.7 C16,26.8656854 15.8656854,27 15.7,27 L13.6,27 C13.2686291,27 13,26.7313708 13,26.4 Z M26.4,27 L24.3,27 C24.1343146,27 24,26.8656854 24,26.7 C24,26.5343146 24.1343146,26.4 24.3,26.4 L26.25,26.4 C26.3328427,26.4 26.4,26.3328427 26.4,26.25 L26.4,24.3 C26.4,24.1343146 26.5343146,24 26.7,24 C26.8656854,24 27,24.1343146 27,24.3 L27,26.4 C27,26.7313708 26.7313708,27 26.4,27 Z M27,13.6 L27,15.7 C27,15.8656854 26.8656854,16 26.7,16 C26.5343146,16 26.4,15.8656854 26.4,15.7 L26.4,13.75 C26.4,13.6671573 26.3328427,13.6 26.25,13.6 L24.3,13.6 C24.1343146,13.6 24,13.4656854 24,13.3 C24,13.1343146 24.1343146,13 24.3,13 L26.4,13 C26.7313708,13 27,13.2686291 27,13.6 Z M13.6,13 L15.7,13 C15.8656854,13 16,13.1343146 16,13.3 C16,13.4656854 15.8656854,13.6 15.7,13.6 L13.75,13.6 C13.6671573,13.6 13.6,13.6671573 13.6,13.75 L13.6,15.7 C13.6,15.8656854 13.4656854,16 13.3,16 C13.1343146,16 13,15.8656854 13,15.7 L13,13.6 C13,13.2686291 13.2686291,13 13.6,13 Z"
      },
      book:{
        type: 'svg',
        size: 24,
        path: "M39.5107143,30.5814448 C36.8530134,29.7515417 33.3544117,29.2946126 29.6589938,29.2946126 C26.0499388,29.2946126 22.633609,29.7332067 19.9999987,30.5269221 C17.366843,29.7332067 13.9505133,29.2946126 10.3410036,29.2946126 C6.6455857,29.2946126 3.14652949,29.7515417 0.489737647,30.5814448 C0.128377594,30.6943502 -0.0784385373,31.0967567 0.0279240443,31.4803456 C0.134286626,31.8639345 0.512919235,32.0820253 0.874279288,31.9705674 C3.41016323,31.1782995 6.77194808,30.7421179 10.3410036,30.7421179 C13.9100591,30.7421179 17.271844,31.1782995 19.8077279,31.9705674 C19.8154551,31.9729799 19.8231823,31.9720149 19.8309095,31.9739449 C19.8777272,31.9869725 19.925454,31.99421 19.9745444,31.99614 C19.9831807,31.99614 19.991817,32 19.9999987,32 C20.0063623,32 20.0118168,31.997105 20.0181804,31.9966225 C20.0759071,31.9951749 20.1340883,31.98842 20.1922695,31.9705674 C22.7281535,31.1782995 26.0899383,30.7421179 29.6589938,30.7421179 C33.2280494,30.7421179 36.5898342,31.1782995 39.1252636,31.9705674 C39.1898085,31.99035 39.2543532,32 39.3184435,32 C39.6125315,32 39.8848015,31.7959018 39.9720734,31.4808281 C40.078436,31.0967567 39.8716199,30.6943502 39.5107143,30.5814448 Z M39.5107143,1.28683223 C36.8530134,0.456929177 33.3544117,0 29.6589938,0 C26.0381206,0 22.6058819,0.439076613 19.9695445,1.23713454 C18.9668271,1.02917628 13.8196055,0 10.3410036,0 C6.64604023,0 3.14743856,0.456929177 0.489737647,1.28683223 L0.000197046519,1.43930279 L0.000197046519,29.3134301 L0.874279288,29.0408166 C3.41061777,28.2485488 6.77240262,27.8128497 10.3410036,27.8128497 C13.9096046,27.8128497 17.2713894,28.2485488 19.8077279,29.0408166 L19.9999987,29.1001643 L20.1922695,29.0403342 C22.7290626,28.2480662 26.0908474,27.8123671 29.6589938,27.8123671 C33.2271402,27.8123671 36.5889251,28.2480662 39.1257182,29.0403342 L39.9998004,29.3134301 L39.9998004,1.43978528 L39.5107143,1.28683223 Z M17.1904812,23.7743098 C15.1650467,23.4124335 12.8591604,23.2213628 10.5214563,23.2213628 C8.12784373,23.2213628 5.7765034,23.4211185 3.72106924,23.7989174 C3.69470587,23.8037424 3.66879703,23.8061549 3.6428882,23.8061549 C3.42561762,23.8061549 3.23380135,23.6406568 3.19561991,23.4061609 C3.15289306,23.1436799 3.3188005,22.8937441 3.56561623,22.8483889 C5.67150444,22.46094 8.07693514,22.2563592 10.5214563,22.2563592 C12.9087054,22.2563592 15.2673184,22.4522549 17.3413887,22.8228163 C17.588659,22.8672064 17.7559301,23.1156949 17.7141123,23.3786583 C17.6727491,23.6411393 17.4382059,23.8158049 17.1904812,23.7743098 Z M17.1904812,20.2602494 C15.163683,19.8978906 12.8573422,19.7068199 10.5214563,19.7068199 C8.12966188,19.7068199 5.77786703,19.9065756 3.72106924,20.2848569 C3.69470587,20.289682 3.66879703,20.2920945 3.6428882,20.2920945 C3.42561762,20.2920945 3.23380135,20.1265964 3.19561991,19.8921006 C3.15289306,19.6296196 3.3188005,19.3796837 3.56561623,19.3343285 C7.73057493,18.5685982 13.1391577,18.5584656 17.3418433,19.3087559 C17.5891135,19.3531461 17.7563846,19.6016344 17.7145668,19.864598 C17.6727491,20.1270789 17.4382059,20.3017446 17.1904812,20.2602494 Z M17.1904812,16.4513804 C15.1659557,16.0890216 12.8600695,15.8979509 10.5214563,15.8979509 C8.13057097,15.8979509 5.7787761,16.0977066 3.7206147,16.4755055 C3.69425132,16.479848 3.66834249,16.4822605 3.6428882,16.4822605 C3.42561762,16.4822605 3.23380135,16.3167624 3.19561991,16.0817841 C3.15289306,15.8193031 3.3188005,15.5693672 3.56607078,15.524012 C5.67468623,15.1370456 8.07966238,14.9319823 10.5219109,14.9319823 C12.9100691,14.9319823 15.268682,15.127878 17.3418433,15.4989219 C17.5895681,15.5433121 17.7563846,15.792283 17.7145668,16.054764 C17.6722945,16.31821 17.4363877,16.492393 17.1904812,16.4513804 Z M17.1904812,12.6415465 C15.1641376,12.2791876 12.8577968,12.0881169 10.5214563,12.0881169 C8.13057097,12.0881169 5.7787761,12.2878726 3.7206147,12.6656715 C3.69425132,12.6704966 3.66834249,12.672909 3.6428882,12.672909 C3.42561762,12.672909 3.23380135,12.5074109 3.19561991,12.2724326 C3.15289306,12.0099516 3.3188005,11.7600157 3.56607078,11.7146605 C7.7346658,10.9494127 13.1418849,10.9392802 17.3418433,11.6895704 C17.5891135,11.7339606 17.7563846,11.9829315 17.7145668,12.2454124 C17.6722945,12.508376 17.4363877,12.6844891 17.1904812,12.6415465 Z M17.1904812,9.12748601 C15.1664103,8.76512719 12.8605241,8.57405649 10.5214563,8.57405649 C8.13057097,8.57405649 5.7787761,8.77381222 3.7206147,9.15161111 C3.69425132,9.15643612 3.66834249,9.15884863 3.6428882,9.15884863 C3.42561762,9.15884863 3.23380135,8.99335052 3.19561991,8.75837216 C3.15289306,8.4958912 3.3188005,8.24595527 3.56607078,8.20060012 C5.67468623,7.81363369 8.07966238,7.60857044 10.5219109,7.60857044 C12.9105235,7.60857044 15.2691366,7.80446615 17.3418433,8.17551002 C17.5895681,8.21990018 17.7563846,8.46887109 17.7145668,8.73135206 C17.6722945,8.99431552 17.4363877,9.16898117 17.1904812,9.12748601 Z M17.1904812,5.31765202 C15.1641376,4.9552932 12.8577968,4.7642225 10.5214563,4.7642225 C8.13057097,4.7642225 5.7787761,4.96397823 3.7206147,5.34177712 C3.69425132,5.34660213 3.66834249,5.34901464 3.6428882,5.34901464 C3.42561762,5.34901464 3.23380135,5.18351653 3.19561991,4.94853817 C3.15289306,4.68605721 3.3188005,4.43612129 3.56607078,4.39076613 C7.7346658,3.62503581 13.1418849,3.61538577 17.3418433,4.36567603 C17.5891135,4.41006619 17.7563846,4.6590371 17.7145668,4.92151807 C17.6722945,5.18448153 17.4363877,5.36107718 17.1904812,5.31765202 Z M36.1675657,23.6536844 C34.1421312,23.291808 31.836245,23.1007373 29.4980864,23.1007373 C27.1044737,23.1007373 24.7531334,23.3004931 22.6976992,23.6782919 C22.6713358,23.683117 22.645427,23.6855295 22.6195182,23.6855295 C22.4022477,23.6855295 22.2104313,23.5200313 22.1722499,23.2855355 C22.1295231,23.0230546 22.2954305,22.7731186 22.5422462,22.7277635 C24.6481345,22.3403145 27.0535652,22.1357338 29.4980864,22.1357338 C31.8857899,22.1357338 34.2439484,22.3316295 36.3184732,22.7021908 C36.5661981,22.7465811 36.7330146,22.9950694 36.6911968,23.2580329 C36.6498336,23.5205139 36.4184723,23.693732 36.1675657,23.6536844 Z M36.1675657,20.139624 C34.1403131,19.7772651 31.8344269,19.5861944 29.4980864,19.5861944 C27.1062919,19.5861944 24.7544971,19.7859502 22.6976992,20.1642316 C22.6713358,20.1690565 22.645427,20.1714691 22.6195182,20.1714691 C22.4022477,20.1714691 22.2104313,20.005971 22.1722499,19.7714751 C22.1295231,19.5089941 22.2954305,19.2590582 22.5422462,19.213703 C26.7085686,18.4479727 32.1162422,18.4378402 36.3184732,19.1881305 C36.5661981,19.2325206 36.7330146,19.4810091 36.6911968,19.7439725 C36.6498336,20.0064535 36.4184723,20.1796716 36.1675657,20.139624 Z M36.1675657,16.330755 C34.1430403,15.9683961 31.8371541,15.7773254 29.4980864,15.7773254 C27.1072009,15.7773254 24.7554061,15.9770811 22.6976992,16.35488 C22.6713358,16.3597051 22.645427,16.3621175 22.6195182,16.3621175 C22.4022477,16.3621175 22.2104313,16.1966195 22.1722499,15.9616411 C22.1295231,15.6991601 22.2954305,15.4492242 22.5422462,15.403869 C24.6508617,15.0169027 27.0562924,14.8118394 29.4980864,14.8118394 C31.886699,14.8118394 34.2448575,15.0077351 36.3184732,15.378779 C36.5661981,15.4231691 36.7330146,15.67214 36.6911968,15.934621 C36.6493791,16.1971019 36.4139268,16.3732152 36.1675657,16.330755 Z M36.1675657,12.520921 C32.0666972,11.7875183 26.7662952,11.7976509 22.6976992,12.545046 C22.6713358,12.5498711 22.645427,12.5522836 22.6195182,12.5522836 C22.4022477,12.5522836 22.2104313,12.3867855 22.1722499,12.1518071 C22.1295231,11.8893261 22.2954305,11.6393902 22.5422462,11.594035 C26.7112958,10.8287873 32.1185149,10.8191373 36.3184732,11.568945 C36.5661981,11.6133351 36.7330146,11.8623061 36.6911968,12.1247871 C36.6498336,12.3877505 36.4184723,12.5648287 36.1675657,12.520921 Z M36.1675657,9.00686058 C34.1434948,8.64450174 31.8376086,8.45343104 29.4980864,8.45343104 C27.1072009,8.45343104 24.7554061,8.65318677 22.6976992,9.03098566 C22.6713358,9.03581068 22.645427,9.03822319 22.6195182,9.03822319 C22.4022477,9.03822319 22.2104313,8.87272508 22.1722499,8.63774672 C22.1295231,8.37526575 22.2954305,8.12532984 22.5422462,8.07997467 C24.6508617,7.69300824 27.0562924,7.48794499 29.4980864,7.48794499 C31.8871536,7.48794499 34.245312,7.68384072 36.3184732,8.05488457 C36.5661981,8.09927474 36.7330146,8.34824566 36.6911968,8.61072661 C36.6493791,8.87320758 36.4139268,9.05076823 36.1675657,9.00686058 Z M36.1675657,5.19702659 C32.0666972,4.46362389 26.7662952,4.47375642 22.6976992,5.22115167 C22.6713358,5.22597669 22.645427,5.2283892 22.6195182,5.2283892 C22.4022477,5.2283892 22.2104313,5.06289109 22.1722499,4.82791273 C22.1295231,4.56543176 22.2954305,4.31549585 22.5422462,4.27014068 C26.7112958,3.50489287 32.1185149,3.49476034 36.3184732,4.24505058 C36.5661981,4.28944075 36.7330146,4.53841167 36.6911968,4.80089262 C36.6498336,5.0638561 36.4184723,5.23996924 36.1675657,5.19702659 Z"
      }
    }

    const processedIcon = (name) => {
      switch(name){
        case 'close':
          return <MaterialIcons name={this.props.name} size={ icons.close.size } style={icons.close.styles} /> ;
        case 'keyboard-arrow-left':
          return <MaterialIcons name={this.props.name} size={ icons.keyboardArrowLeft.size } style={icons.keyboardArrowLeft.styles} /> ;
        case 'menu':
          return <MaterialIcons name={this.props.name} size={ icons.menu.size } style={icons.menu.styles} /> ;
        case 'person':
          return <MaterialIcons name={this.props.name} size={ icons.person.size } style={icons.person.styles} /> ;
        case 'note-add':
          return <MaterialIcons name={this.props.name} size={ icons.noteAdd.size } style={icons.noteAdd.styles} /> ;
        case 'scan':
          return (
            <Svg height={icons.scan.size} width={icons.scan.size} fill={colors.blue} viewBox="0 0 20 20">
              <G transform="translate(-10.000000, -10.000000)">
                <Path d={icons.scan.path} fill={colors.blue} />
              </G>
            </Svg>
          );
        case 'book':
          return(
            <Svg height={icons.book.size} width={icons.book.size * 1.2} fill={colors.blue} viewBox="0 0 40 32">
              <G>
                <Path d={icons.book.path} fill={colors.blue} />
              </G>
            </Svg>
          );
        default:
          return {}
      }
    }

    const styles = StyleSheet.create({
      rounded: {
        height: dimension, 
        width: dimension,
        minWidth: dimension,
        borderRadius: dimension / 2,
        backgroundColor: colors.yellow,
      },
      normal:{
        height: dimension, 
        width: dimension,
        minWidth: dimension,
      },
      
      centered:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
      }
    })


    return (
      <TouchableOpacity style={this.props.rounded ? styles.rounded : styles.normal} onPress={this.props.onPress}>
        <View style={styles.centered}>
          {
            processedIcon(this.props.name)
          }
          
        </View>
      </TouchableOpacity>
    );
  }
}